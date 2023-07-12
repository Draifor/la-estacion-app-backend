import { Model, DataTypes } from 'sequelize';

export const Ingredient = (sequelize) => {
  class IngredientModel extends Model {}

  IngredientModel.init(
    {
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ingredient_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ingredient_description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ingredient_price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ingredient_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Ingredient',
      tableName: 'ingredients'
    }
  );

  return IngredientModel;
};
