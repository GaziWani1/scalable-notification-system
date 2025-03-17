import User from '../model/user.model.js';
import { JWT_EXPRIES_IN, JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import runTransaction from '../utils/transactionHelper.js';

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    const result = await runTransaction(async (session) => {
      const users = await User.create([{ name, email, password }], {
        session,
      });
      const token = jwt.sign({ userId: users[0]._id }, JWT_SECRET, {
        expiresIn: JWT_EXPRIES_IN,
      });

      return { token, user: users[0] };
    });

    return res.status(201).json({
      sucess: true,
      message: 'User Created successfully',
      data: {
        token :result.token,
        user : result.user
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPRIES_IN,
    });
    return res.status(201).json({
      sucess: true,
      message: 'User loged in successfully',
      data: {
        token,
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
