const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Supplier = require('../models/Supplier');
const Client = require('../models/Client');

// Signup function for Supplier
exports.signupSupplier = async (req, res) => {
  try {
    const { companyName, email, password, phone, address } = req.body;
    
    // Check if email already exists
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) return res.status(400).json({ message: 'Email already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new supplier
    const newSupplier = new Supplier({
      companyName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newSupplier.save();

    const token = jwt.sign({ supplierId: newSupplier._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(201).json({ message: 'Supplier created successfully', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signin function for Supplier
exports.signinSupplier = async (req, res) => {
  try {
    const { email, password } = req.body;

    const supplier = await Supplier.findOne({ email });
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ supplierId: supplier._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Signin successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signup function for Client
exports.signupClient = async (req, res) => {
  try {
    const { companyName, email, password, phone, address } = req.body;

    // Check if email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) return res.status(400).json({ message: 'Email already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new client
    const newClient = new Client({
      companyName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newClient.save();

    const token = jwt.sign({ clientId: newClient._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(201).json({ message: 'Client created successfully', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signin function for Client
exports.signinClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ clientId: client._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Signin successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
