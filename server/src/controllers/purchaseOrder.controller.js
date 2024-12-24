const PurchaseOrder = require('../models/PurchaseOrder');

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const { medicineId, supplierId, quantityOrdered, expectedDeliveryDate, totalCost } = req.body;

    const newPurchaseOrder = new PurchaseOrder({
      medicineId,
      supplierId,
      quantityOrdered,
      expectedDeliveryDate,
      totalCost,
    });

    await newPurchaseOrder.save();
    res.status(201).json({ message: 'Purchase order created successfully', newPurchaseOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().populate('medicineId supplierId');
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
