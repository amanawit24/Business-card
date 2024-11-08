router.post('/admin/register', async (req, res) => {
    const { name, email, password, role } = req.body; // Role can be user or admin
    
    // Middleware to check if the user is an admin should be implemented
    // Assume req.user contains the authenticated user
  
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role, // Role can be user or admin based on the request
      });
      
      await newUser.save();
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  