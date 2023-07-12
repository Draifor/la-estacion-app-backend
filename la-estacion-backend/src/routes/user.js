import express from 'express';
import bcrypt from 'bcryptjs';

import db from '../utils/database.js';

const router = express.Router();

// Define routes to handle CRUD operations on users
router.get('/', async (req, res) => {
  // Get all users
  try {
    const users = await db.User.findAll();
    res.json(users);
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
    res.status(201).json({ username: user.username, name: user.name, role: user.role, cellphone: user.cellphone });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  // Actualizar un usuario por su id
  const { id } = req.params;
  const { username, password, name, role, cellphone } = req.body;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.update({
      username,
      password,
      name,
      role,
      cellphone
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  // Eliminar un usuario por su id
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
