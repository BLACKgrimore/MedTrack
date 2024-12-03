const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true,
  },
  quantityAdded: {
    type: Number,
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
    default: 0,
  },
  stockBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  transactionType: {
    type: String,
    enum: ['purchase', 'sale'],
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
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

module.exports = mongoose.model('Inventory', inventorySchema);
