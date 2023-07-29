'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('invoices', 'invoice_date');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('invoices', 'invoice_date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
  }
};
