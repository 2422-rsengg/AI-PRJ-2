import React, { useEffect, useState } from 'react';
import { policyholdersAPI } from '../services/api';
import '../styles/StatsCharts.css';

const StatsCharts = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await policyholdersAPI.getStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to load statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Policyholders</h3>
        <p className="stat-value">{stats.total_policyholders}</p>
      </div>

      <div className="stat-card">
        <h3>Age Distribution</h3>
        <ul className="distribution-list">
          {Object.entries(stats.age_distribution || {}).map(([range, count]) => (
            <li key={range}>
              {range}: <strong>{count}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="stat-card">
        <h3>Salary Distribution</h3>
        <ul className="distribution-list">
          {Object.entries(stats.salary_distribution || {}).map(([range, count]) => (
            <li key={range}>
              {range}: <strong>{count}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="stat-card">
        <h3>Renewal Status</h3>
        <ul className="distribution-list">
          {Object.entries(stats.renewal_status_counts || {}).map(([status, count]) => (
            <li key={status}>
              {status}: <strong>{count}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsCharts;
