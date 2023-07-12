import { Model, DataTypes } from 'sequelize';

export const SupplierType = (sequelize) => {
  class SupplierTypeModel extends Model {}
  SupplierTypeModel.init(
    {
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'SupplierType',
      tableName: 'supplier_types'
    }
  );
  return SupplierTypeModel;
};
