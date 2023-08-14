import { Model, DataTypes } from 'sequelize';

export const Invoice = (sequelize) => {
  class InvoiceModel extends Model {}

  InvoiceModel.init(
    {
      invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      invoice_number_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Invoice',
      tableName: 'invoices'
    }
  );

  return InvoiceModel;
};
