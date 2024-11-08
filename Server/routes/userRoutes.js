const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
const { userVerification } = require('../Middlewares/AuthMiddleware');

// Get a user by id
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Extract the id from the URL
    const user = await User.findById(userId); // Query the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send the user data back
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post('/userdata',userVerification)


// Search users by name
router.get('/users/search', async (req, res) => {
  const { name } = req.query;
  try {
      const users = await User.find({ name: { $regex: new RegExp(name, 'i') } });
      res.json(users);
  } catch (err) {
      res.status(404).json({ error: 'Failed to search users' });
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
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);
      res.json({ message: 'User deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' });
  }
});


// app.post("/deleteUser", async(req, res)=>{
//   const {userid}  = req.body;
//   try{
//     User.deleteOne({_id: userid}, function (err,res){
//       console.log(err);
//     });
//     res.send({ status: "ok", data:"Deleted "});
//   }catch(error){
//     console.log(error);
//   }

//   });


module.exports = router;
