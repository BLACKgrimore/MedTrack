const Medicine = require('../models/Medicine');

// Add new medicine
exports.addMedicine = async (req, res) => {
  try {
    const { medicineName, genericName, manufacturer, dosageForm, strength, quantityInStock, purchasePrice, salePrice, expirationDate, supplierId } = req.body;

    const newMedicine = new Medicine({
      medicineName,
      genericName,
      manufacturer,
      dosageForm,
      strength,
      quantityInStock,
      purchasePrice,
      salePrice,
      expirationDate,
      supplierId,
    });

    await newMedicine.save();
    res.status(201).json({ message: 'Medicine added successfully', newMedicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update medicine details
exports.updateMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const updatedData = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(medicineId, updatedData, { new: true });
    if (!updatedMedicine) return res.status(404).json({ message: 'Medicine not found' });

    res.status(200).json({ message: 'Medicine updated successfully', updatedMedicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate('supplierId');
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
