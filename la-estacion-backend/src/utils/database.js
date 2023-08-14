import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import { User } from '../models/user.model.js';
import { Dough } from '../models/dough.model.js';
import { Product } from '../models/product.model.js';
import { Invoice } from '../models/invoice.model.js';
import { InvoiceNumber } from '../models/invoiceNumber.model.js';
import { Supplier } from '../models/supplier.model.js';
import { Ingredient } from '../models/ingredient.model.js';
import { SupplierType } from '../models/supplierType.model.js';
import { DoughProduct } from '../models/doughProduct.model.js';
import { IngredientDough } from '../models/ingredientDough.model.js';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT,
    dialectModule: mysql,
    timezone: '-05:00',
    logging: false
  }
);

const db = {
  sequelize,

  User: User(sequelize),
  Supplier: Supplier(sequelize),
  Invoice: Invoice(sequelize),
  InvoiceNumber: InvoiceNumber(sequelize),
  SupplierType: SupplierType(sequelize),
  Dough: Dough(sequelize),
  Product: Product(sequelize),
  Ingredient: Ingredient(sequelize),
  DoughProduct: DoughProduct(sequelize),
  IngredientDough: IngredientDough(sequelize)
};

// Define the associations between the models
db.Supplier.hasMany(db.InvoiceNumber, {
  foreignKey: 'supplier_id',
  onDelete: 'restrict'
});
db.InvoiceNumber.belongsTo(db.Supplier, { foreignKey: 'supplier_id' });
db.InvoiceNumber.hasMany(db.Invoice, {
  foreignKey: 'invoice_number_id',
  onDelete: 'restrict'
});
db.Invoice.belongsTo(db.InvoiceNumber, { foreignKey: 'invoice_number_id' });
db.SupplierType.hasMany(db.Supplier, {
  foreignKey: 'type_id',
  onDelete: 'restrict'
});
db.Supplier.belongsTo(db.SupplierType, { foreignKey: 'type_id' });

db.Ingredient.hasMany(db.IngredientDough, {
  foreignKey: 'ingredient_id',
  onDelete: 'restrict'
});
db.Dough.hasMany(db.IngredientDough, {
  foreignKey: 'dough_id',
  onDelete: 'restrict'
});
db.IngredientDough.belongsTo(db.Ingredient, { foreignKey: 'ingredient_id' });
db.IngredientDough.belongsTo(db.Dough, { foreignKey: 'dough_id' });

db.Dough.hasMany(db.DoughProduct, {
  foreignKey: 'dough_id',
  onDelete: 'restrict'
});
db.Product.hasMany(db.DoughProduct, {
  foreignKey: 'product_id',
  onDelete: 'restrict'
});
db.DoughProduct.belongsTo(db.Dough, { foreignKey: 'dough_id' });
db.DoughProduct.belongsTo(db.Product, { foreignKey: 'product_id' });

export default db;

// Sincronizar los modelos con la base de datos usando alter
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Los modelos se han sincronizado con la base de datos usando alter');
//   })
//   .catch((error) => {
//     console.error('Ha ocurrido un error al sincronizar los modelos con la base de datos usando alter:', error);
//   });
