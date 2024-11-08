// components/Admin/Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import './User.css'; 
import axiosInstance from '../axiosInstance';
import { ToastContainer, toast } from "react-toastify";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);



    const [loading, setLoading] = useState(true);
    const limit = 10; // Users per page

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

    const addUser = async (userData) => {
        try {
            const response = await axios.post('/api/admin/users', userData);
            setUsers([response.data, ...users]);
            setIsAddModalOpen(false);
        } catch (err) {
            console.error('Failed to add user');
        }
    };

    const updateUser = async (userId, updatedData) => {
        try {
            const response = await axios.put(`/api/admin/users/${userId}`, updatedData);
            setUsers(users.map(user => (user._id === userId ? response.data : user)));
            setIsEditModalOpen(false);
        } catch (err) {
            console.error('Failed to update user');
        }
    };

     const deleteUser = async (userId) => {
         if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`/api/admin/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.error('Failed to delete user');
        }
    };

// const deleteUser =(id, name)=>{
//     if ( window.confirm('are u sure ${name}')){
//          fetch("http://localhost:5000/userData",{
//             method:"POST",
//             crossDomain:"true",
//             headers:{
//                 "Content-Type":"application/json",
//                 Accept:"application/json",
//                 "Access-Control-Allow-Origin":"*",
//             },body:JSON.stringify({
//                 token:window.localStorage.getItem("token")
//             }),
//             }

//          )}
//     }
// };

    return (
        <div className="users">
            <h2>Users</h2>
            <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setIsAddModalOpen(true)}>Add New User</button>
            

            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}>Edit</button>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                                {/* <button onClick={()=>deleteUser(i._id,i.name)}/> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages}>Next</button>
            </div>

            {isAddModalOpen && <AddUserModal onClose={() => setIsAddModalOpen(false)} onSave={addUser} />}
            {isEditModalOpen && selectedUser && (
                <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onSave={updateUser} />
            )}</div>
            
            );
};

export default Users;
