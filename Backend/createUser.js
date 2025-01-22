import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
import { connectDB } from './config/db.js';

dotenv.config();

const createUser = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('Hashed Password:', hashedPassword);

    // Create a new user object
    const user = new User({
      name: 'Test User',
      email: 'user1@gmail.com',
      password: hashedPassword,
    });

    console.log('User Object:', user);

    // Save the user to the database
    const savedUser = await user.save();
    console.log('User created successfully:', savedUser);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating user:', error.message);
    mongoose.connection.close();
  }
};

// Run the function
createUser();
