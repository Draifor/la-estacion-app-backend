import { Model, DataTypes } from 'sequelize';

export const Product = (sequelize) => {
  class ProductModel extends Model {}

  ProductModel.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product_cost: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products'
    }
  );

  return ProductModel;
};
