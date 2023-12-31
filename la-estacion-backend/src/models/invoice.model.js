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
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      paid_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payment_status: {
        type: DataTypes.ENUM('Crédito', 'Pagada'),
        allowNull: false
      },
      remaining_amount: {
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
