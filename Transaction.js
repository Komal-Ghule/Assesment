app.get('/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const query = {
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: parseFloat(search) || { $exists: true } }
      ]
    };
  
    try {
      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  