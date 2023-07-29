import bcrypt from 'bcryptjs';

import db from '../../utils/database.js';

// Function to convert a User object to DTO
const userToDTO = (user) => {
  const userDTO = {
    id: user.user_id,
    username: user.username,
    name: user.name,
    role: user.role,
    phone: user.cellphone
  };
  return userDTO;
};

// Create user controller
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await db.User.findAll();

      // Convert users to DTO
      const usersDTO = users.map((user) => userToDTO(user));
      console.log('users DTO', usersDTO);

      res.json(usersDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Get user by id
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.User.findByPk(id);
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Convert user to DTO
      const userDTO = userToDTO(user);
      console.log('user DTO', userDTO);

      res.json(userDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Create a new user
  createUser: async (req, res) => {
    try {
      const userDTO = req.body;
      // Search for user
      const userExists = await db.User.findOne({
        where: {
          username: userDTO.username
        }
      });
      if (userExists) {
        return res.status(400).send('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(userDTO.password, 10);
      const user = await db.User.create({
        username: userDTO.username,
        name: userDTO.name,
        password: hashedPassword,
        role: userDTO.role,
        cellphone: userDTO.phone
      });

      // Convert user to DTO
      const userCreatedDTO = userToDTO(user);
      console.log('user created DTO', userCreatedDTO);

      res.status(201).json(userCreatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Update user
  updateUser: async (req, res) => {
    try {
      const userDTO = req.body;
      const { isChangingPassword } = req.params;
      const user = await db.User.findByPk(userDTO.id);
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Search for user
      const userExists = await db.User.findOne({
        where: {
          username: userDTO.username
        }
      });
      if (userExists && userExists.user_id !== user.user_id) {
        return res.status(400).send('Username already exists');
      }

      if (isChangingPassword) {
        if (userDTO.password === '') {
          return res.status(400).send('Password is required');
        }
        if (userDTO.password.length < 5) {
          return res.status(400).send('Password must be at least 5 characters');
        }
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        await user.update({
          username: userDTO.username,
          name: userDTO.name,
          password: hashedPassword,
          role: userDTO.role,
          cellphone: userDTO.phone
        });
      } else {
        await user.update({
          username: userDTO.username,
          name: userDTO.name,
          role: userDTO.role,
          cellphone: userDTO.phone
        });
      }

      // Convert user to DTO
      const userUpdatedDTO = userToDTO(user);
      console.log('user updated DTO', userUpdatedDTO);

      res.json(userUpdatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Delete user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.User.findByPk(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      await user.destroy();

      // Convert user to DTO
      const userDeletedDTO = userToDTO(user);
      console.log('user deleted DTO', userDeletedDTO);

      res.json(userDeletedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export default userController;
