import express from 'express';

import invoiceController from './ingredientsController.js';

const router = express.Router();

// Define routes to handle CRUD operations
router.get('/:from/:to', invoiceController.getAllInvoices);

router.get('/:id', invoiceController.getInvoiceById);

router.post('/', invoiceController.createInvoice);

router.put('/', invoiceController.updateInvoice);

router.delete('/:id', invoiceController.deleteInvoice);

export default router;
