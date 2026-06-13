import React, { useEffect, useState } from 'react';
import { policyholdersAPI } from '../services/api';
import RecommendationModal from './RecommendationModal';
import '../styles/PolicyholdersTable.css';

const PolicyholdersTable = () => {
  const [policyholders, setPolicyholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadPolicyholders = async () => {
      try {
        const response = await policyholdersAPI.getAllPolicyholders();
        setPolicyholders(response.data);
      } catch (err) {
        setError('Failed to load policyholders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPolicyholders();
  }, []);

  const handleRecommendation = (policyholder) => {
    setSelectedCustomer(policyholder);
    setShowModal(true);
  };

  if (loading) return <div>Loading policyholders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <div className="table-container">
        <h2>All Policyholders</h2>
        <table className="policyholders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Policy Type</th>
              <th>Renewal Date</th>
              <th>Claims</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {policyholders.map((ph) => (
              <tr key={ph.id} className={`status-${ph.status.toLowerCase()}`}>
                <td>{ph.name}</td>
                <td>{ph.age}</td>
                <td>${ph.salary.toLocaleString()}</td>
                <td>{ph.policy_type}</td>
                <td>{ph.renewal_date}</td>
                <td>{ph.claims_count}</td>
                <td>
                  <span className={`badge badge-${ph.status.toLowerCase()}`}>
                    {ph.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-recommend"
                    onClick={() => handleRecommendation(ph)}
                  >
                    Get Recommendation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedCustomer && (
        <RecommendationModal
          customer={selectedCustomer}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default PolicyholdersTable;
