import { Model, DataTypes } from 'sequelize';

export const Supplier = (sequelize) => {
  class SupplierModel extends Model {}

  SupplierModel.init(
    {
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      supplier_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Supplier',
      tableName: 'suppliers'
    }
  );

  return SupplierModel;
};
