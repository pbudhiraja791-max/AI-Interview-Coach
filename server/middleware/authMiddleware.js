import jwt from 'jsonwebtoken';
import { db } from '../services/memoryDbService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_ai_interview_coach_jwt_key_2026_production';

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.findUserById(decoded.id || decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired user session' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
}

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
