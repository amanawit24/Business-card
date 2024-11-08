// components/Admin/EditUserModal.js
import React, { useState } from 'react';

const EditUserModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user._id, formData); // Call onSave function with updated data
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal">
                <h3>Edit User</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Role:
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>
                    <div className="modal-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditUserModal;
