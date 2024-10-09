const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key'; // Secret key for JWT
const TOKEN_EXPIRATION = '30m';       // Token expiration time

// Mock file to store user data
const USERS_FILE = './users.json';

// Helper function to read users from a file
const readUsersFromFile = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data || '[]');
};

// Helper function to write users to a file
const writeUsersToFile = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Helper function to find user by username
const findUserByUsername = (username) => {
  const users = readUsersFromFile();
  return users.find(user => user.username === username);
};

