
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // For basic styling
import axiosInstance from '../axiosInstance';
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users'); // API for fetching users
        console.log(response.data.users)
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="metrics">
          <MetricCard title="Total Users" count={users.length} />
          <MetricCard title="Active Users" count={users.filter(user => user.active).length} />
          <MetricCard title="Admins" count={users.filter(user => user.role === 'admin').length} />
        </div>
        <div className="user-table">
          <h2>All Users</h2>
          {loading ? <p>Loading users...</p> : <UserTable users={users} />}
        </div>
      </div>
      <Link to='/users' className="user">Users</Link>
           
      
      <ToastContainer hideProgressBar={true}/>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => (
  <div className="sidebar">
    <h2>Admin Panel</h2>

    <Link to='/users' className="users">Users</Link>
  
    {/* <ul>
      <li><Link to="/admin/dashboard">Dashboard</Link></li>
      <li><Link to="/admin/users">Users</Link></li>
       
      <li><Link to="/admin/settings">Settings</Link></li>
    </ul> */}
  </div>
);

// Header Component
const Header = () => (
  <div className="header">
    <h1>Admin Dashboard</h1>
    <p>Welcome back, Admin!</p>
  </div>
);

// Metric Card Component
const MetricCard = ({ title, count }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{count}</p>
  </div>
);

// User Table Component
const UserTable = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.active ? 'Active' : 'Inactive'}</td>
        </tr>
      ))}
    </tbody>
  </table>

  
);

export default Dashboard;
