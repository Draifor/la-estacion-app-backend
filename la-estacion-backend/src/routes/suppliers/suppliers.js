import express from 'express';

import supplierController from './suppliersController.js';

const router = express.Router();

// Define routes to handle CRUD operations
router.get('/', supplierController.getAllSuppliers);

router.get('/:id', supplierController.getSupplierById);

router.post('/', supplierController.createSupplier);

router.put('/', supplierController.updateSupplier);

router.delete('/:id', supplierController.deleteSupplier);

export default router;
