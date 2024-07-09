app.get('/statistics', async (req, res) => {
    const { month } = req.query;
  
    try {
      const totalSales = await Transaction.aggregate([
        { $match: { dateOfSale: { $month: month } } },
        { $group: { _id: null, totalAmount: { $sum: '$price' }, soldItems: { $sum: { $cond: ['$sold', 1, 0] } }, notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } } } }
      ]);
      res.status(200).json(totalSales[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  