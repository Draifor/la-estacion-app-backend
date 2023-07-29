import express from 'express';

import userController from './usersController.js';

const router = express.Router();

// Define routes to handle CRUD operations
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.put('/', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;
