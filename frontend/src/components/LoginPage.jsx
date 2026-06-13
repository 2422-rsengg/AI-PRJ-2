import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('Officer');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (isRegistering) {
      // --- REGISTRATION LOGIC ---
      if (!username || !password || !fullName) {
        setError('Please fill out all registration fields.');
        return;
      }

      // Check if user already exists
      const existingUser = localStorage.getItem(`user_${username}`);
      if (existingUser || username.toLowerCase() === 'demo') {
        setError('Username is already taken.');
        return;
      }

      // Save user details to localStorage for next time
      const userData = { username, password, fullName, profession };
      localStorage.setItem(`user_${username}`, JSON.stringify(userData));
      
      setMessage('Registration successful! You can now log in.');
      setIsRegistering(false); // Flip back to login mode automatically
      setPassword(''); // Clear password for security
    } else {
      // --- LOGIN LOGIC ---
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }

      // 1. Check for Hardcoded Demo Account
      if (username === 'demo' && password === 'demo123') {
        localStorage.setItem("token", "mock-jwt-token-demo");
        localStorage.setItem("userProfession", "Manager");
        onLoginSuccess();
        return;
      }

      // 2. Check for Registered Accounts in LocalStorage
      const storedUserRaw = localStorage.getItem(`user_${username}`);
      if (storedUserRaw) {
        const storedUser = JSON.parse(storedUserRaw);
        if (storedUser.password === password) {
          localStorage.setItem("token", `mock-jwt-token-${username}`);
          localStorage.setItem("userProfession", storedUser.profession);
          onLoginSuccess();
          return;
        }
      }

      setError('Invalid username or password credentials.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', boxSizing: 'border-box' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#4f46e5', padding: '8px 14px', borderRadius: '8px', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', marginBottom: '12px' }}>
            🛡️ PUR
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: '0 0 6px 0' }}>
            {isRegistering ? 'Create Terminal Account' : 'Broker Access Terminal'}
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {isRegistering ? 'Register your underwriter profile credentials' : 'Underwriting Intelligence Suite v2.4'}
          </p>
        </div>

        {/* Action Toggle Tabs */}
        <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '4px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #1e293b' }}>
          <button 
            type="button"
            onClick={() => { setIsRegistering(false); setError(''); setMessage(''); }}
            style={{ flex: 1, padding: '8px', fontSize: '13px', fontWeight: '600', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: !isRegistering ? '#4f46e5' : 'transparent', color: !isRegistering ? '#ffffff' : '#94a3b8' }}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => { setIsRegistering(true); setError(''); setMessage(''); }}
            style={{ flex: 1, padding: '8px', fontSize: '13px', fontWeight: '600', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: isRegistering ? '#4f46e5' : 'transparent', color: isRegistering ? '#ffffff' : '#94a3b8' }}
          >
            Register
          </button>
        </div>

        {/* Notification Status Alerts */}
        {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', fontWeight: '500' }}>⚠️ {error}</div>}
        {message && <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#34d399', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', fontWeight: '500' }}>✓ {message}</div>}

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {isRegistering && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>Full Officer Name</label>
              <input 
                type="text" 
                placeholder="e.g. Inspector Clouseau"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>User Name</label>
            <input 
              type="text" 
              placeholder="Enter unique keyname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>Access Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>Insurance Officer Profession</label>
            <select 
              value={profession} 
              onChange={(e) => setProfession(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
            >
              <option value="Officer">Insurance Officer</option>
              <option value="Manager">Insurance Manager</option>
            </select>
          </div>

          <button 
            type="submit"
            style={{ width: '100%', padding: '12px', backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)' }}
          >
            {isRegistering ? 'Register New Profile' : 'Authorize Terminal Access'}
          </button>

        </form>
      </div>
    </div>
  );
}