import { Model, DataTypes } from 'sequelize';

export const DoughProduct = (sequelize) => {
  class DoughProductModel extends Model {}

  DoughProductModel.init(
    {
      dough_product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      dough_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      dough_product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'DoughProduct',
      tableName: 'dough_products'
    }
  );

  return DoughProductModel;
};
