const PRODUCT_ID          = '695902cfc240b17f16c3d716';
const LMS_API_KEY         = 'my-secret-key-123';
const MIDDLEWARE_BASE_URL = 'https://email-middleware-qyrt.onrender.com';
const MIDDLEWARE_API_KEY  = 'averlon-mail-2026!';
const AGENT_FILE_URL      = 'https://raw.githubusercontent.com/MrunmayeeCom/tally_agent/main/DownloadAgent.zip';

// 🔥 Bump this string whenever a new agent build is released.
// That single change is all it takes to re-trigger the popup + email for every user.
const AGENT_VERSION = '1.0.2';

// ─── Dev helper ───────────────────────────────────────────────────────────────
// Open the browser console and run:  window.resetAgentUpdate()
// This clears the stored version so the popup fires again on next login.
if (typeof window !== 'undefined') {
  window.resetAgentUpdate = () => {
    localStorage.removeItem('agent_version_seen');
    console.log('[AgentUpdate] Reset done — popup will show on next login.');
  };
}

// ─── License check ────────────────────────────────────────────────────────────

const checkActiveLicense = async (email) => {
  try {
    console.log('[AgentUpdate] Checking license for:', email);
    const response = await fetch(
      `https://license-system-v6ht.onrender.com/api/external/actve-license/${email}?productId=${PRODUCT_ID}`,
      { headers: { 'x-api-key': LMS_API_KEY } }
    );
    console.log('[AgentUpdate] License API status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('[AgentUpdate] License API response:', data);
      return data.activeLicense?.status === 'active';
    }
    const text = await response.text();
    console.warn('[AgentUpdate] License API non-ok response:', text);
    return false;
  } catch (err) {
    console.error('[AgentUpdate] License check threw:', err);
    return false;
  }
};

// ─── REMOVED: hasEmailBeenSent  ───────────────────────────────────────────────
// ─── REMOVED: markEmailAsSent   ───────────────────────────────────────────────
// Backend sent-tracking via /agent-update-sent has been replaced by
// localStorage version tracking. No middleware endpoints are called
// for deduplication anymore.

// ─── Middleware: send email ───────────────────────────────────────────────────

const sendEmail = async (userEmail, userName) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1a1a1a; margin-bottom: 8px;">The Agent is Updated!</h2>
      <p style="color: #444; font-size: 15px; line-height: 1.6;">Dear ${userName || 'User'},</p>
      <p style="color: #444; font-size: 15px; line-height: 1.6;">
        A new version of the agent is now available.
        Please download and install it at your earliest convenience to
        ensure you have the most up-to-date features and improvements.
      </p>
      <a href="${AGENT_FILE_URL}" style="display:inline-block; margin-top: 16px; padding: 12px 24px; background:#4F46E5; color:white; border-radius:6px; text-decoration:none; font-size:15px; font-weight:bold;">
        Download Updated Agent
      </a>
      <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
        If you have any questions, please contact our support team.
      </p>
    </div>
  `;

  try {
    const url = `${MIDDLEWARE_BASE_URL}/agent-update`;
    console.log('[AgentUpdate] Sending email via:', url, '→ to:', userEmail);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': MIDDLEWARE_API_KEY,
      },
      body: JSON.stringify({
        to:      userEmail,
        subject: 'Agent is Updated!',
        html,
      }),
    });
    console.log('[AgentUpdate] Send-email status:', response.status);
    const result = await response.json();
    console.log('[AgentUpdate] Send-email response:', result);
    if (!response.ok) {
      console.error('[AgentUpdate] Email send failed:', result);
    }
  } catch (err) {
    console.error('[AgentUpdate] sendEmail threw:', err);
  }
};

// ─── Main export ──────────────────────────────────────────────────────────────

export const checkAndNotifyOnLogin = async ({ email, name }) => {
  console.log('[AgentUpdate] ── checkAndNotifyOnLogin called ──');
  console.log('[AgentUpdate] email:', email, '| name:', name, '| version:', AGENT_VERSION);

  // 1. Validate email
  if (!email) {
    console.warn('[AgentUpdate] No email provided — aborting.');
    return null;
  }

  // 2. Must have an active license
  const hasActiveLicense = await checkActiveLicense(email);
  console.log('[AgentUpdate] hasActiveLicense:', hasActiveLicense);
  if (!hasActiveLicense) {
    console.warn('[AgentUpdate] No active license — aborting.');
    return null;
  }

  // 3. Compare stored version against current version
  const localVersion = localStorage.getItem('agent_version_seen');
  console.log('[AgentUpdate] localVersion:', localVersion, '| currentVersion:', AGENT_VERSION);

  if (localVersion === AGENT_VERSION) {
    // 4. Same version — user has already seen this update
    console.log('[AgentUpdate] Already seen this version — skipping.');
    return null;
  }

  // 5. New (or first) version — send email, persist version, show popup
  await sendEmail(email, name);
  localStorage.setItem('agent_version_seen', AGENT_VERSION);
  console.log('[AgentUpdate] Done — showing popup with:', AGENT_FILE_URL);

  return AGENT_FILE_URL;
};