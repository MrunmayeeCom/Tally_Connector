import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const BUCKET = 'agent-files';
const FILE_NAME = 'agent-latest.zip';
const LAST_SEEN_KEY = 'lastSeenAgentUpdate';
const PRODUCT_ID = '695902cfc240b17f16c3d716';
const LMS_API_KEY = 'my-secret-key-123';

const getLoggedInUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user;
  } catch {
    return null;
  }
};

const checkActiveLicense = async (email) => {
  try {
    const response = await fetch(
      `https://license-system-v6ht.onrender.com/api/external/actve-license/${email}?productId=${PRODUCT_ID}`,
      { headers: { 'x-api-key': LMS_API_KEY } }
    );
    if (response.ok) {
      const data = await response.json();
      return data.activeLicense?.status === 'active';
    }
    return false;
  } catch {
    return false;
  }
};

const getLastSeen = async (email) => {
  const { data } = await supabase
  .from('user_agent_versions')
  .select('last_seen_version')
  .eq('email',email)
  .single();
  return data?.last_seen_version ?? null;
};

const setLastSeen = async (email,value) => {
  await supabase
  .from('user_agent_versions')
  .upsert({email, last_seen_version: value});
};

export const checkAndNotify = async () => {
  const user = getLoggedInUser();
  console.log('1. User found:', user);
  if (!user || !user.email) return null;

  const hasActiveLicense = await checkActiveLicense(user.email);
  console.log('2. Has active license:', hasActiveLicense);
  if (!hasActiveLicense) return null;

  const { data, error } = await supabase
    .storage
    .from(BUCKET)
    .list('');

  console.log('3. Supabase data:', data, 'error:', error);
  if (error || !data?.length) return null;

  const file = data[0];
  console.log('4. File found:', file);

  const lastUpdated = file.updated_at;
  const lastSeen = await getLastSeen(user.email);
  console.log('5. lastUpdated:', lastUpdated, 'lastSeen:', lastSeen);

  if (lastSeen !== lastUpdated) {
    const { data: urlData } = supabase
      .storage
      .from(BUCKET)
      .getPublicUrl(FILE_NAME);

    await sendEmail(urlData.publicUrl, user.email, user.name);
    await setLastSeen(user.email, lastUpdated);

    return urlData.publicUrl;
  }

  return null;
};

const sendEmail = async (fileUrl, userEmail, userName) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': import.meta.env.VITE_BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: 'Your App', email: 'johndoedummy243@gmail.com' },
      to: [{ email: userEmail, name: userName || userEmail }],
      subject: 'Agent is Updated!',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a1a1a; margin-bottom: 8px;">The Agent is Updated!</h2>
          <p style="color: #444; font-size: 15px; line-height: 1.6;">Dear ${userName || 'User'},</p>
          <p style="color: #444; font-size: 15px; line-height: 1.6;">
            We would like to inform you that a new version of the agent is now available. 
            Please download and install the latest version at your earliest convenience to 
            ensure you have the most up-to-date features and improvements.
          </p>
          <a href="${fileUrl}" style="display:inline-block; margin-top: 16px; padding: 12px 24px; background:#4F46E5; color:white; border-radius:6px; text-decoration:none; font-size:15px; font-weight:bold;">
            Download Updated Agent
          </a>
          <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
            If you have any questions, please contact our support team.
          </p>
        </div>
      `,
    }),
  });

  if (response.ok) {
    console.log('Email sent to:', userEmail);
  } else {
    console.error('Email failed:', await response.json());
  }
};