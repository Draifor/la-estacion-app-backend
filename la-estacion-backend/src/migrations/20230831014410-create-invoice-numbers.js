'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_numbers', {
      invoice_number_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'supplier_id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict'
      },
      total_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      paid_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_status: {
        type: Sequelize.ENUM('Crédito', 'Pagada'),
        allowNull: false
      },
      remaining_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice_numbers');
  }
};
