import React, { useState } from 'react';
import RecommendationModal from './RecommendationModal';

const initialPolicyholders = [
  { id: 1, name: "Sarah Johnson", age: 42, premium: "$95,000", type: "Home", renewalDate: "2024-07-20", claims: 1, status: "ACTIVE" },
  { id: 2, name: "Michael Chen", age: 55, premium: "$125,000", type: "Life", renewalDate: "2024-08-10", claims: 0, status: "ACTIVE" },
  { id: 3, name: "Emily Davis", age: 28, premium: "$55,000", type: "Auto", renewalDate: "2024-05-25", claims: 2, status: "PENDING" },
  { id: 4, name: "Robert Wilson", age: 64, premium: "$180,000", type: "Home", renewalDate: "2024-09-30", claims: 0, status: "ACTIVE" },
];

export default function ProfessionalDashboard() {
  const [policyholders] = useState(initialPolicyholders);
  const [selectedUser, setSelectedUser] = useState(null);
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const triggerRecommendation = async (user) => {
    setLoadingId(user.id);
    try {
      const response = await fetch("http://localhost:8000/api/recommend/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policyholder_name: user.name,
          age: user.age,
          policy_type: user.type,
          current_premium: user.premium,
          claims_count: user.claims,
          status: user.status
        })
      });
      
      const data = await response.json();
      setRecommendationResult(data);
      setSelectedUser(user);
    } catch (error) {
      console.error("Error communicating with underwriting backend:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* SaaS Top Header Navbar */}
      <header style={{ backgroundColor: '#020617', borderBottom: '1px solid #334155', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#4f46e5', padding: '8px 12px', borderRadius: '8px', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.05em' }}>
            🛡️ PUR
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc', margin: 0, letterSpacing: '0.02em' }}>Underwriting Intelligence Suite</h1>
            <p style={{ fontSize: '12px', color: '#818cf8', fontFamily: 'monospace', margin: '2px 0 0 0' }}>Automated Policy Renewal Engine v2.4</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
  <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
    Active Broker ({localStorage.getItem("userProfession") || "Officer"})
  </span>
  <span style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0', fontFamily: 'monospace' }}>
    {localStorage.getItem("token")?.includes("demo") ? "demo_user" : "registered_agent"}
  </span>
</div>
          
          <button 
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isAuthenticated");
              sessionStorage.clear();
              window.location.href = "/";
            }}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#1e293b', 
              border: '1px solid #475569', 
              color: '#cbd5e1', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: '600', 
              cursor: 'pointer', 
              transition: 'background-color 0.2s' 
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#334155'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1e293b'}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
        
        {/* Metric KPI Indicator Strip */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1e293b', padding: '16px', borderRadius: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Assessments</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fbbf24', marginTop: '4px' }}>01 <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Profiles</span></div>
          </div>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1e293b', padding: '16px', borderRadius: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Optimized Premiums Formulated</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#34d399', marginTop: '4px' }}>03 <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Policies</span></div>
          </div>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1e293b', padding: '16px', borderRadius: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Underwriting Success Velocity</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#818cf8', marginTop: '4px' }}>98.4% <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Automation Rate</span></div>
          </div>
        </section>

        {/* Account Data Grid Module */}
        <section style={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px', backgroundColor: '#020617', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#e2e8f0', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Active Renewal Portfolio Queue</h3>
            <span style={{ padding: '4px 10px', backgroundColor: '#0f172a', color: '#94a3b8', fontFamily: 'monospace', borderRadius: '4px', fontSize: '12px', border: '1px solid #1e293b' }}>4 Accounts Monitored</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '16px' }}>Policyholder</th>
                  <th style={{ padding: '16px' }}>Age</th>
                  <th style={{ padding: '16px' }}>Baseline Premium</th>
                  <th style={{ padding: '16px' }}>Line Type</th>
                  <th style={{ padding: '16px' }}>Expiration Date</th>
                  <th style={{ padding: '16px', textAlign: 'center' }}>Claims</th>
                  <th style={{ padding: '16px' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>
                {policyholders.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #0f172a', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '16px', fontWeight: '600', color: '#ffffff' }}>{user.name}</td>
                    <td style={{ padding: '16px', color: '#94a3b8' }}>{user.age}</td>
                    <td style={{ padding: '16px', fontFamily: 'monospace', fontWeight: '600', color: '#e2e8f0' }}>{user.premium}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 8px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '12px', color: '#cbd5e1' }}>{user.type}</span>
                    </td>
                    <td style={{ padding: '16px', color: '#94a3b8', fontFamily: 'monospace', fontSize: '13px' }}>{user.renewalDate}</td>
                    <td style={{ padding: '16px', textAlign: 'center', fontFamily: 'monospace' }}>{user.claims}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px', 
                        fontWeight: '700', 
                        letterSpacing: '0.05em',
                        backgroundColor: user.status === "ACTIVE" ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                        border: user.status === "ACTIVE" ? '1px solid #10b981' : '1px solid #f59e0b',
                        color: user.status === "ACTIVE" ? '#34d399' : '#fbbf24'
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button
                        onClick={() => triggerRecommendation(user)}
                        disabled={loadingId !== null}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: loadingId === user.id ? 'not-allowed' : 'pointer',
                          backgroundColor: '#4f46e5',
                          border: '1px solid #6366f1',
                          color: '#ffffff',
                          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                          opacity: loadingId === user.id ? 0.6 : 1
                        }}
                      >
                        {loadingId === user.id ? "Analyzing..." : "Review Optimization"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modular Results Workspace Modal */}
      {selectedUser && recommendationResult && (
        <RecommendationModal 
          user={selectedUser} 
          result={recommendationResult} 
          onClose={() => {
            setSelectedUser(null);
            setRecommendationResult(null);
          }} 
        />
      )}
    </div>
  );
}