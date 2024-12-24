const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  genericName: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  dosageForm: {
    type: String,
    enum: ['tablet', 'capsule', 'syrup', 'injection', 'ointment', 'others'],
    required: true,
  },
  strength: {
    type: String,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'out of stock', 'discontinued'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Medicine', medicineSchema);
