// authController.js or similar
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const express = require('express');
const mongoose = require('mongoose');
const app = express();

module.exports.userVerification = (req, res) => {
    // console.log("Incoming cookies:", req.cookies); // For debugging

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(401).json({ status: false, message: "Invalid token" });
        }

        try {
          
            const user = await User.findById(decoded.id);
            if (user) {
                return res.status(200).json({ status: true, user: user });
            } else {
                return res.status(404).json({ status: false, message: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });

    // middlewares/isAdmin.js
module.exports = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      // Proceed if the user is an admin
      next();
    } else {
      // If the user is not an admin, return a forbidden response
      return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
  };
  
};


app.use(express.json());

// Update Address Endpoint
app.put('/api/business-card/:id/address', async (req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    try {
        const updatedCard = await BusinessCard.findByIdAndUpdate(
            id,
            { address },
            { new: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ message: "Business card not found" });
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: "Error updating address", error });
    }
});

