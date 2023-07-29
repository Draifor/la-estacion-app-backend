import { Op } from 'sequelize';

import db from '../../utils/database.js';

// Function to convert a Invoice object to DTO
const invoiceToDTO = (invoice) => {
  const invoiceDTO = {
    id: invoice.invoice_id,
    supplier: invoice.Supplier.supplier_name,
    description: invoice.description,
    date: invoice.invoice_date,
    dueDate: invoice.due_date,
    totalAmount: invoice.total_amount,
    paidAmount: invoice.paid_amount,
    paymentStatus: invoice.payment_status,
    remainingAmount: invoice.remaining_amount
  };
  return invoiceDTO;
};

// Create invoice controller
const invoiceController = {
  // Get all invoices
  getAllInvoices: async (req, res) => {
    try {
      const { from, to } = req.params;

      if (!from || !to) {
        return res.status(400).send('Missing from or to');
      }

      console.log('from:', from);
      console.log('to:', to);

      const startDate = new Date(from);
      const endDate = new Date(to);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      console.log('startDate:', startDate);
      console.log('endDate:', endDate);

      const invoices = await db.Invoice.findAll({
        where: {
          invoice_date: {
            [Op.between]: [startDate, endDate]
          }
        },
        include: {
          model: db.Supplier,
          attributes: ['supplier_name']
        }
      });

      // Convert invoices to DTO
      const invoicesDTO = invoices.map((invoice) => invoiceToDTO(invoice));
      console.log('getAllInvoices:', invoicesDTO.length);

      res.json(invoicesDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Get invoice by id
  getInvoiceById: async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await db.Invoice.findByPk(id);
      if (!invoice) {
        return res.status(404).send('Invoice not found');
      }

      // Convert invoice to DTO
      const invoiceDTO = invoiceToDTO(invoice);
      console.log('getInvoiceById:', invoiceDTO);

      res.json(invoiceDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Create a new invoice
  createInvoice: async (req, res) => {
    try {
      const invoiceDTO = req.body;
      // Search for invoice type
      const supplier = await db.Supplier.findOne({
        where: {
          supplier_name: invoiceDTO.supplier
        }
      });
      if (!supplier) {
        return res.status(404).send('Supplier not found');
      }
      // Create invoice
      const invoice = {
        invoice_date: invoiceDTO.date,
        due_date: invoiceDTO.dueDate,
        description: invoiceDTO.description,
        total_amount: invoiceDTO.totalAmount,
        paid_amount: invoiceDTO.paidAmount,
        payment_status: invoiceDTO.paymentStatus,
        remaining_amount: invoiceDTO.remainingAmount
      };
      const invoiceCreated = await db.Invoice.create(invoice);

      invoiceCreated.Supplier = supplier;

      // Convert invoice to DTO
      const invoiceCreatedDTO = invoiceToDTO(invoiceCreated);
      console.log('createInvoiceDTO:', invoiceCreatedDTO);

      res.status(201).json(invoiceCreatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Update a invoice
  updateInvoice: async (req, res) => {
    try {
      const invoiceDTO = req.body;
      console.log('updateInvoice --> Input:', invoiceDTO);
      // Search for invoice type
      const supplier = await db.Supplier.findOne({
        where: {
          supplier_name: invoiceDTO.supplier
        }
      });
      if (!supplier) {
        return res.status(404).send('Supplier not found');
      }
      // Update invoice
      const invoice = {
        supplier_id: supplier.supplier_id,
        description: invoiceDTO.description,
        due_date: invoiceDTO.dueDate,
        total_amount: invoiceDTO.totalAmount,
        paid_amount: invoiceDTO.paidAmount,
        payment_status: invoiceDTO.paymentStatus,
        remaining_amount: invoiceDTO.remainingAmount
      };
      await db.Invoice.update(invoice, {
        where: {
          invoice_id: invoiceDTO.id
        }
      });

      const invoiceUpdated = await db.Invoice.findByPk(invoiceDTO.id, {
        include: {
          model: db.Supplier,
          attributes: ['supplier_name']
        }
      });

      // Convert invoice to DTO
      const invoiceUpdatedDTO = invoiceToDTO(invoiceUpdated);
      console.log('updateInvoice --> output:', invoiceUpdatedDTO);

      res.json(invoiceUpdatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Delete a invoice
  deleteInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await db.Invoice.findByPk(id, {
        include: {
          model: db.Supplier,
          attributes: ['supplier_name']
        }
      });
      if (!invoice) {
        return res.status(404).send('Invoice not found');
      }
      await invoice.destroy();

      // Convert invoice to DTO
      const invoiceDeletedDTO = invoiceToDTO(invoice);
      console.log('deleteInvoice:', invoiceDeletedDTO);

      res.json(invoiceDeletedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export default invoiceController;
