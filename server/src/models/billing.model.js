// models/Bill.js
import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
    {
        hiredEmployeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HiredEmployee',
            required: true
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
            required: true
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true
        },
        billingPeriod: {
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            }
        },
        totalHoursBilled: {
            type: Number,
            required: true,
            min: 0
        },
        hourlyRate: {
            type: Number,
            required: true,
            min: 0
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'overdue'],
            default: 'pending'
        },
        generatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserClient', // or other user role if necessary
            required: true
        },
        invoiceDate: {
            type: Date,
            default: Date.now
        },
        paymentDueDate: {
            type: Date,
            required: true
        },
        notes: {
            type: String
        }
    },
    { timestamps: true }
);

const Billing = mongoose.model('Billing', billSchema);

export default Billing;
