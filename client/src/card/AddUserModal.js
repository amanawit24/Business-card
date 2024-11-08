
// components/Admin/AddUserModal.js
import React, { useState } from 'react';

const AddUserModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal">
            <h3>Add New User</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button type="submit">Save</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddUserModal;
