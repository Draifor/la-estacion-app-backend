import { Model, DataTypes } from 'sequelize';

export const Dough = (sequelize) => {
  class DoughModel extends Model {}

  DoughModel.init(
    {
      dough_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      dough_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dough_description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dough_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Dough',
      tableName: 'doughs'
    }
  );

  return DoughModel;
};
