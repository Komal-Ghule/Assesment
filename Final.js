app.get('/combined', async (req, res) => {
    const { month } = req.query;
  
    try {
      const [statistics, barChart, pieChart] = await Promise.all([
        axios.get(`http://localhost:3000/statistics?month=${month}`),
        axios.get(`http://localhost:3000/bar-chart?month=${month}`),
        axios.get(`http://localhost:3000/pie-chart?month=${month}`)
      ]);
  
      res.status(200).json({
        statistics: statistics.data,
        barChart: barChart.data,
        pieChart: pieChart.data
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  