const Inventory = require('../models/Inventory');

// Add to inventory (purchase stock)
exports.addToInventory = async (req, res) => {
  try {
    const { medicineId, quantityAdded, transactionType, supplierId, clientId } = req.body;

    // Get the current medicine stock
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

    let newStockBalance;
    if (transactionType === 'purchase') {
      newStockBalance = medicine.quantityInStock + quantityAdded;
    } else if (transactionType === 'sale') {
      newStockBalance = medicine.quantityInStock - quantityAdded;
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    // Update inventory
    const newInventory = new Inventory({
      medicineId,
      quantityAdded,
      stockBalance: newStockBalance,
      transactionType,
      supplierId,
      clientId,
    });

    await newInventory.save();

    // Update the medicine stock balance
    medicine.quantityInStock = newStockBalance;
    await medicine.save();

    res.status(201).json({ message: 'Inventory updated successfully', newInventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get inventory history
exports.getInventoryHistory = async (req, res) => {
  try {
    const inventoryHistory = await Inventory.find().populate('medicineId');
    res.status(200).json(inventoryHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
