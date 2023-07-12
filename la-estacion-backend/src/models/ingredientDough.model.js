import { Model, DataTypes } from 'sequelize';

export const IngredientDough = (sequelize) => {
  class IngredientDoughModel extends Model {}

  IngredientDoughModel.init(
    {
      ingredient_dough_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      dough_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ingredient_dough_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'IngredientDough',
      tableName: 'ingredient_doughs'
    }
  );

  return IngredientDoughModel;
};
