// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get users with search and pagination
router.get('/users', async (req, res) => {
    const { search = '', page = 1, limit = 10 } = req.query;
    const query = search
        ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
        : {};

    try {
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await User.countDocuments(query);
        res.json({ users, total });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Add new user
router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Update user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
