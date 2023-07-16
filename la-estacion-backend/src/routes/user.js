import express from 'express';
import bcrypt from 'bcryptjs';

import db from '../utils/database.js';

const router = express.Router();

// Define routes to handle CRUD operations on users
router.get('/', async (req, res) => {
  // Get all users
  try {
    const users = await db.User.findAll();
    res.json(
      users.map((user) => ({
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        role: user.role,
        cellphone: user.cellphone
      }))
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  // Get user by id
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  // Create a new user
  const { username, password, name, role, cellphone } = req.body;

  const userExists = await db.User.findOne({
    where: {
      username
    }
  });
  if (userExists) {
    return res.status(400).send('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.User.create({
      username,
      name,
      password: hashedPassword,
      role,
      cellphone
    });
    res.status(201).json({
      username: user.username,
      name: user.name,
      role: user.role,
      cellphone: user.cellphone
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/', async (req, res) => {
  // Update a user
  const {
    // eslint-disable-next-line camelcase
    user_id,
    username,
    password,
    name,
    role,
    cellphone,
    isChangingPassword
  } = req.body;
  try {
    const user = await db.User.findByPk(user_id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (isChangingPassword) {
      if (password.trim() === '') {
        return res.status(400).send('Password is required');
      }
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res.status(400).send('Current password is incorrect');
      // }
      if (password.length < 5) {
        return res.status(400).send('Password must be at least 5 characters');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({
        username,
        name,
        password: hashedPassword,
        role,
        cellphone
      });
    } else {
      await user.update({
        username,
        name,
        role,
        cellphone
      });
    }
    res.json({
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      role: user.role,
      cellphone: user.cellphone
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a user
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.destroy();
    res.send('User deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
