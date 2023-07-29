import db from '../../utils/database.js';

// Function to convert a Supplier object to DTO
const supplierToDTO = (supplier) => {
  const supplierDTO = {
    id: supplier.supplier_id,
    name: supplier.supplier_name,
    type: supplier.SupplierType.type_name,
    address: supplier.address,
    phone: supplier.telephone
  };
  return supplierDTO;
};

// Create supplier controller
const supplierController = {
  // Get all suppliers
  getAllSuppliers: async (req, res) => {
    try {
      const suppliers = await db.Supplier.findAll({
        include: {
          model: db.SupplierType,
          attributes: ['type_name']
        }
      });

      // Convert suppliers to DTO
      const suppliersDTO = suppliers.map((supplier) => supplierToDTO(supplier));
      console.log('getAllSuppliers:', suppliersDTO.length);

      res.json(suppliersDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Get supplier by id
  getSupplierById: async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await db.Supplier.findByPk(id);
      if (!supplier) {
        return res.status(404).send('Supplier not found');
      }

      // Convert supplier to DTO
      const supplierDTO = supplierToDTO(supplier);
      console.log('getSupplierById:', supplierDTO);

      res.json(supplierDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Create a new supplier
  createSupplier: async (req, res) => {
    try {
      const supplierDTO = req.body;
      // Search for supplier type
      const supplierType = await db.SupplierType.findOne({
        where: {
          type_name: supplierDTO.type
        }
      });
      if (!supplierType) {
        return res.status(404).send('Supplier type not found');
      }
      // Create supplier
      const supplier = {
        supplier_name: supplierDTO.name,
        type_id: supplierType.type_id,
        address: supplierDTO.address,
        telephone: supplierDTO.phone
      };
      const supplierCreated = await db.Supplier.create(supplier);

      supplierCreated.SupplierType = supplierType;

      // Convert supplier to DTO
      const supplierCreatedDTO = supplierToDTO(supplierCreated);
      console.log('createSupplierDTO:', supplierCreatedDTO);

      res.status(201).json(supplierCreatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Update a supplier
  updateSupplier: async (req, res) => {
    try {
      const supplierDTO = req.body;
      console.log('updateSupplier --> Input:', supplierDTO);
      // Search for supplier type
      const supplierType = await db.SupplierType.findOne({
        where: {
          type_name: supplierDTO.type
        }
      });
      if (!supplierType) {
        return res.status(404).send('Supplier type not found');
      }
      // Update supplier
      const supplier = {
        supplier_name: supplierDTO.name,
        type_id: supplierType.type_id,
        address: supplierDTO.address,
        telephone: supplierDTO.phone
      };
      await db.Supplier.update(supplier, {
        where: {
          supplier_id: supplierDTO.id
        }
      });

      const supplierUpdated = await db.Supplier.findByPk(supplierDTO.id, {
        include: {
          model: db.SupplierType,
          attributes: ['type_name']
        }
      });

      // Convert supplier to DTO
      const supplierUpdatedDTO = supplierToDTO(supplierUpdated);
      console.log('updateSupplier --> output:', supplierUpdatedDTO);

      res.json(supplierUpdatedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Delete a supplier
  deleteSupplier: async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await db.Supplier.findByPk(id, {
        include: {
          model: db.SupplierType,
          attributes: ['type_name']
        }
      });
      if (!supplier) {
        return res.status(404).send('Supplier not found');
      }
      await supplier.destroy();

      // Convert supplier to DTO
      const supplierDeletedDTO = supplierToDTO(supplier);
      console.log('deleteSupplier:', supplierDeletedDTO);

      res.json(supplierDeletedDTO);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export default supplierController;
