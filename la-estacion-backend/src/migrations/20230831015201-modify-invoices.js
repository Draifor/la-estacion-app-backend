'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('invoices', 'invoice_number_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'invoice_numbers',
        key: 'invoice_number_id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    });

    await queryInterface.removeColumn('invoices', 'due_date');
    await queryInterface.removeColumn('invoices', 'total_amount');
    await queryInterface.removeColumn('invoices', 'paid_amount');
    await queryInterface.removeColumn('invoices', 'payment_status');
    await queryInterface.removeColumn('invoices', 'remaining_amount');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('invoices', 'remaining_amount', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('invoices', 'payment_status', {
      type: Sequelize.ENUM('Crédito', 'Pagada'),
      allowNull: false
    });
    await queryInterface.addColumn('invoices', 'paid_amount', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('invoices', 'total_amount', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('invoices', 'due_date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
    await queryInterface.removeColumn('invoices', 'invoice_number_id');
  }
};
