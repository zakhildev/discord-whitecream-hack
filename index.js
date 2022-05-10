const express = require('express');

const app = express();

app.get('/', async (req, res) => {
  res.status(200).json(
    {
      ip: req.ip
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
