import { Model, DataTypes } from 'sequelize';

export const InvoiceNumber = (sequelize) => {
  class InvoiceNumberModel extends Model {}

  InvoiceNumberModel.init(
    {
      invoice_number_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      supplier_id: {
        type: DataTypes.INTEGER,
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
      modelName: 'InvoiceNumber',
      tableName: 'invoice_numbers'
    }
  );

  return InvoiceNumberModel;
};
