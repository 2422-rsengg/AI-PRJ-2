import React, { useState } from 'react';

export default function RecommendationModal({ result, onClose }) {
  const [activeTab, setActiveTab] = useState('assessment');
  const [emailText, setEmailText] = useState(result?.communication_draft || '');
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to split markdown bullet points into a clean React array
  const parseBulletPoints = (markdownText) => {
    if (!markdownText) return [];
    return markdownText
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace('-', '').trim());
  };

  const bulletPoints = parseBulletPoints(result.recommendation);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)' }}>
      <div style={{ width: '100%', maxWidth: '896px', height: '600px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        
        {/* Modal Header */}
        <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Policy Renewal Action Center</h2>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Automated Risk & Underwriting Assessment Matrix</p>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8', background: 'none', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
            ✕ Close
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '0 24px' }}>
          <button 
            onClick={() => setActiveTab('assessment')}
            style={{ 
              padding: '12px 16px', 
              fontSize: '14px', 
              fontWeight: '600', 
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'assessment' ? '2px solid #4f46e5' : '2px solid transparent',
              color: activeTab === 'assessment' ? '#4f46e5' : '#64748b',
              cursor: 'pointer'
            }}
          >
            Underwriting Assessment
          </button>
          <button 
            onClick={() => setActiveTab('comms')}
            style={{ 
              padding: '12px 16px', 
              fontSize: '14px', 
              fontWeight: '600', 
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'comms' ? '2px solid #4f46e5' : '2px solid transparent',
              color: activeTab === 'comms' ? '#4f46e5' : '#64748b',
              cursor: 'pointer'
            }}
          >
            Client Communications Draft
          </button>
        </div>

        {/* Tab Content Display */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
          
          {activeTab === 'assessment' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Top Summary Widget Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>System Strategy Path</span>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginTop: '4px' }}>
                    {result.recommendation.split('\n')[0].replace('###', '').trim()}
                  </div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Risk Profile Routing</span>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#4f46e5', marginTop: '4px' }}>
                    {result.recommendation.split('\n')[1]?.split('|')[1]?.replace('Classification Profile:', '').trim() || 'Standard Classification'}
                  </div>
                </div>
              </div>

              {/* Itemized Modifications UI Cards */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Proposed Policy Line Modifications</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {bulletPoints.map((point, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4f46e5', marginTop: '6px', flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', color: '#334155', fontWeight: '500' }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Action Item Alert Box */}
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>📋</span>
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#78350f', margin: 0 }}>Required Account Executive Action</h5>
                  <p style={{ fontSize: '14px', color: '#92400e', margin: '2px 0 0 0' }}>
                    {result.recommendation.split('Recommended Next Step:')[1]?.trim() || 'Verify parameters manually before signature routing.'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Staged Email Notification Workspace</label>
                <button 
                  onClick={handleCopy}
                  style={{ 
                    padding: '6px 12px', 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    borderRadius: '4px', 
                    border: 'none',
                    color: '#ffffff',
                    backgroundColor: copied ? '#059669' : '#1e293b', 
                    cursor: 'pointer'
                  }}
                >
                  {copied ? '✓ Copied to Clipboard' : '📋 Copy Draft'}
                </button>
              </div>
              
              <textarea
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                style={{ 
                  flex: 1, 
                  width: '100%', 
                  padding: '16px', 
                  fontFamily: 'monospace', 
                  fontSize: '14px', 
                  color: '#334155', 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '8px', 
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)', 
                  resize: 'none', 
                  lineHeight: '1.6',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div style={{ padding: '12px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button 
            onClick={onClose} 
            style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#334155', backgroundColor: '#ffffff', cursor: 'pointer' }}
          >
            Dismiss
          </button>
          <button 
            onClick={() => alert('Strategy committed to database successfully!')}
            style={{ padding: '8px 16px', backgroundColor: '#4f46e5', border: '1px solid #6366f1', color: '#ffffff', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            Commit & Apply Changes
          </button>
        </div>

      </div>
    </div>
  );
}