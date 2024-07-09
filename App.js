const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

const transactionSchema = new mongoose.Schema({
  dateOfSale: Date,
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/initialize', async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(data);
    res.status(200).send('Database initialized');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
