/* eslint-disable camelcase */
import express from 'express';

import db from '../utils/database.js';

const router = express.Router();

// Define routes to handle CRUD operations on suppliers
router.get('/', async (req, res) => {
  // Get all suppliers
  try {
    const suppliers = await db.Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  // Get supplier by id
  const { id } = req.params;
  try {
    const supplier = await db.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  // Create a new supplier
  const { supplier_name, type_id, address, telephone } = req.body;

  // const supplierExists = await db.Supplier.findOne({
  //   where: {
  //     supplier_name
  //   }
  // });
  // if (supplierExists) {
  //   return res.status(400).send('Supplier already exists');
  // }

  try {
    const supplier = await db.Supplier.create({
      supplier_name,
      type_id,
      address,
      telephone
    });
    res.json(supplier);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/', async (req, res) => {
  // Update a supplier
  const { supplier_id, supplier_name, type_id, address, telephone } = req.body;
  try {
    const supplier = await db.Supplier.findByPk(supplier_id);
    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }
    await supplier.update({
      supplier_name,
      type_id,
      address,
      telephone
    });
    res.json(supplier);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a supplier
  const { id } = req.params;
  try {
    const supplier = await db.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }
    await supplier.destroy();
    res.json(supplier);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
