import bcrypt from 'bcryptjs';
import { db } from '../services/memoryDbService.js';
import { generateToken } from '../middleware/authMiddleware.js';

export async function register(req, res) {
  try {
    const { name, email, password, targetRole, experienceLevel, skills, interviewGoals } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser({
      name,
      email,
      password: hashedPassword,
      targetRole: targetRole || "Software Engineer",
      experienceLevel: experienceLevel || "1-3 years",
      skills: skills || ["JavaScript", "React", "Node.js"],
      interviewGoals: interviewGoals || ["Prepare for upcoming interviews"]
    });

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function demoLogin(req, res) {
  try {
    const demoUser = await db.findUserByEmail("alex.sharma@example.com");
    if (!demoUser) {
      return res.status(404).json({ success: false, message: 'Demo candidate profile not found' });
    }

    const token = generateToken(demoUser);
    const { password: _, ...userSafe } = demoUser;

    res.json({
      success: true,
      message: 'Logged in as Demo Candidate (Alex Sharma)',
      token,
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    const { password: _, ...userSafe } = req.user;
    res.json({ success: true, user: userSafe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const updates = req.body;
    delete updates.password; // Don't update password via this route
    delete updates._id;

    const updatedUser = await db.updateUser(req.user._id, updates);
    const { password: _, ...userSafe } = updatedUser;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }
    // Return simulated reset link / token for immediate use
    res.json({
      success: true,
      message: 'Password reset link sent to your email (simulated for demo)',
      resetToken: 'demo-reset-token-2026'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, newPassword } = req.body;
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.updateUser(user._id, { password: hashedPassword });
    res.json({ success: true, message: 'Password updated successfully. Please login.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
