import db from '../../utils/database.js';

// Function to convert a Ingredient object to DTO
const ingredientToDTO = (ingredient) => {
  const ingredientDTO = {
    id: ingredient.ingredient_id,
    name: ingredient.ingredient_name,
    description: ingredient.ingredient_description,
    price: ingredient.ingredient_price,
    stock: ingredient.ingredient_stock,
    unit: ingredient.ingredient_unit
  };
  return ingredientDTO;
};

// Create ingredient controller
const ingredientController = {
  // Get all ingredients
  getAllIngredients: async (req, res) => {
    try {
      const ingredients = await db.Ingredient.findAll();

      // Convert ingredients to DTO
      const ingredientsDTO = ingredients.map((ingredient) =>
        ingredientToDTO(ingredient)
      );
      console.log('getAllIngredients:', ingredientsDTO.length);

      res.json(ingredientsDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Get ingredient by id
  getIngredientById: async (req, res) => {
    try {
      const { id } = req.params;
      const ingredient = await db.Ingredient.findByPk(id);
      if (!ingredient) {
        return res.status(404).send('Ingredient not found');
      }

      // Convert ingredient to DTO
      const ingredientDTO = ingredientToDTO(ingredient);
      console.log('getIngredientById:', ingredientDTO);

      res.json(ingredientDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Create a new ingredient
  createIngredient: async (req, res) => {
    try {
      const ingredientDTO = req.body;
      // Search for ingredient
      const ingredientExists = await db.Ingredient.findOne({
        where: {
          ingredient_name: ingredientDTO.name
        }
      });
      if (ingredientExists) {
        return res.status(404).send('Ingredient already exists');
      }

      // Create ingredient
      const ingredient = {
        ingredient_name: ingredientDTO.name,
        ingredient_description: ingredientDTO.description,
        ingredient_price: ingredientDTO.price,
        ingredient_stock: ingredientDTO.stock,
        ingredient_unit: ingredientDTO.unit
      };

      const ingredientCreated = await db.Ingredient.create(ingredient);

      // Convert ingredient to DTO
      const ingredientCreatedDTO = ingredientToDTO(ingredientCreated);
      console.log('createIngredientDTO:', ingredientCreatedDTO);

      res.status(201).json(ingredientCreatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Update ingredient
  updateIngredient: async (req, res) => {
    try {
      const ingredientDTO = req.body;
      console.log('updateIngredient --> Input:', ingredientDTO);
      // Search for ingredient type
      const ingredient = await db.Ingredient.findByPk(ingredientDTO.id);
      if (!ingredient) {
        return res.status(404).send('Ingredient not found');
      }

      // Search for ingredient
      const ingredientExists = await db.Ingredient.findOne({
        where: {
          ingredient_name: ingredientDTO.name
        }
      });
      if (
        ingredientExists &&
        ingredientExists.ingredient_id !== ingredient.ingredient_id
      ) {
        return res.status(404).send('Ingredient already exists');
      }

      // Update ingredient
      await ingredient.update({
        ingredient_name: ingredientDTO.name,
        ingredient_description: ingredientDTO.description,
        ingredient_price: ingredientDTO.price,
        ingredient_stock: ingredientDTO.stock,
        ingredient_unit: ingredientDTO.unit
      });

      // Convert ingredient to DTO
      const ingredientUpdatedDTO = ingredientToDTO(ingredient);
      console.log('updateIngredient --> output:', ingredientUpdatedDTO);

      res.json(ingredientUpdatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Delete a ingredient
  deleteIngredient: async (req, res) => {
    try {
      const { id } = req.params;
      const ingredient = await db.Ingredient.findByPk(id);
      if (!ingredient) {
        return res.status(404).send('Ingredient not found');
      }
      await ingredient.destroy();

      // Convert ingredient to DTO
      const ingredientDeletedDTO = ingredientToDTO(ingredient);
      console.log('deleteIngredient:', ingredientDeletedDTO);

      res.json(ingredientDeletedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export default ingredientController;
