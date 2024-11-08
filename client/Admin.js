import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Assume user is stored in localStorage after login

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/'); // Redirect to home if not admin
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content here */}
    </div>
  );
};

export default AdminDashboard;
