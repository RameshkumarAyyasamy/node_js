const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract token
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      req.user = user;  // Attach user info to request
      next();
    });
  };
  
  app.get('/tasks', authenticateToken, (req, res) => {
    // For demonstration purposes, return some dummy tasks
    const tasks = [
      { id: 1, task: 'Complete project', user: req.user.username },
      { id: 2, task: 'Read documentation', user: req.user.username },
    ];
  
    res.json({ tasks });
  });
  