const SalesInvoice = require('../models/SalesInvoice');

// Create a sales invoice
exports.createSalesInvoice = async (req, res) => {
  try {
    const { medicineId, clientId, quantitySold, unitPrice, totalAmount } = req.body;

    const newInvoice = new SalesInvoice({
      medicineId,
      clientId,
      quantitySold,
      unitPrice,
      totalAmount,
    });

    await newInvoice.save();
    res.status(201).json({ message: 'Sales invoice created successfully', newInvoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sales invoices
exports.getAllSalesInvoices = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find().populate('medicineId clientId');
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
