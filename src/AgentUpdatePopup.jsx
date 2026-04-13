import { useState, useEffect } from 'react';

export default function AgentUpdatePopup({ fileUrl, onDismiss }) {
  const [downloading, setDownloading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    window.open(fileUrl, '_blank');
    setTimeout(() => setDownloading(false), 2000);
  };

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss?.(), 280);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .aup-overlay {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.25s ease;
          font-family: 'Inter', sans-serif;
        }
        .aup-overlay.visible { opacity: 1; }

        .aup-card {
          background: #ffffff;
          border: 1px solid #ebebeb;
          border-radius: 14px;
          padding: 28px;
          max-width: 380px;
          width: 90%;
          transform: translateY(14px);
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }
        .aup-overlay.visible .aup-card {
          transform: translateY(0);
        }

        .aup-icon-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 18px;
        }
        .aup-icon {
          width: 34px; height: 34px;
          background: #f4f4f4;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .aup-badge {
          font-size: 11px;
          font-weight: 600;
          color: #aaaaaa;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .aup-title {
          font-size: 17px;
          font-weight: 600;
          color: #111111;
          margin: 0 0 7px;
          line-height: 1.3;
        }
        .aup-desc {
          font-size: 13.5px;
          color: #999999;
          line-height: 1.65;
          margin: 0 0 22px;
        }

        .aup-download-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%;
          padding: 12px;
          background: #111111;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          margin-bottom: 14px;
          transition: background 0.15s;
        }
        .aup-download-btn:hover { background: #2a2a2a; }
        .aup-download-btn:active { background: #000; }
        .aup-download-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .aup-email-hint {
          display: flex; align-items: flex-start; gap: 8px;
          background: #f9f9f9;
          border: 1px solid #efefef;
          border-radius: 8px;
          padding: 11px 13px;
          margin-bottom: 12px;
        }
        .aup-email-hint svg {
          flex-shrink: 0;
          margin-top: 1px;
        }
        .aup-email-hint p {
          font-size: 12.5px;
          color: #888;
          line-height: 1.55;
          margin: 0;
        }
        .aup-email-hint p strong {
          color: #555;
          font-weight: 500;
        }

        .aup-close {
          display: block; width: 100%;
          padding: 9px;
          background: transparent;
          color: #ccc;
          border: none;
          border-radius: 8px;
          font-size: 12.5px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: color 0.15s;
        }
        .aup-close:hover { color: #999; }

        .aup-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className={`aup-overlay${visible ? ' visible' : ''}`}>
        <div className="aup-card">
          <div className="aup-icon-row">
            <div className="aup-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M4.5 7l3.5 3.5L11.5 7M2 14h12" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="aup-badge">New Update Available</span>
          </div>

          <h2 className="aup-title">Agent has been updated</h2>
          <p className="aup-desc">A new version is ready to install.</p>

          <button className="aup-download-btn" onClick={handleDownload} disabled={downloading}>
            {downloading ? (
              <><span className="aup-spinner" /> Opening…</>
            ) : (
              'Download Latest Agent'
            )}
          </button>

          <div className="aup-email-hint">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4z" stroke="#aaa" strokeWidth="1.3"/>
              <path d="M2 4l6 5 6-5" stroke="#aaa" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <p>
              <strong>Not now?</strong> Get Download Link via Email.
            </p>
          </div>

          <button className="aup-close" onClick={handleDismiss}>Dismiss</button>
        </div>
      </div>
    </>
  );
}