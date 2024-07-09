app.get('/pie-chart', async (req, res) => {
    const { month } = req.query;
  
    try {
      const pieChart = await Transaction.aggregate([
        { $match: { dateOfSale: { $month: month } } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      res.status(200).json(pieChart);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  