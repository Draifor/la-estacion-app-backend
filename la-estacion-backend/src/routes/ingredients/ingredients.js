import express from 'express';

import ingredientController from './ingredientsController.js';

const router = express.Router();

// Define routes to handle CRUD operations
router.get('/', ingredientController.getAllIngredients);

router.get('/:id', ingredientController.getIngredientById);

router.post('/', ingredientController.createIngredient);

router.put('/', ingredientController.updateIngredient);

router.delete('/:id', ingredientController.deleteIngredient);

export default router;
