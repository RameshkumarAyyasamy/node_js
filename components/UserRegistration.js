app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if user already exists
    if (findUserByUsername(username)) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Store the new user
    const newUser = { username, password: hashedPassword };
    const users = readUsersFromFile();
    users.push(newUser);
    writeUsersToFile(users);
  
    res.status(201).json({ message: 'User registered successfully' });
  });
  