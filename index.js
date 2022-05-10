const express = require('express');
const path = require('node:path');

const app = express();
app.use('/static', express.static(path.join(__dirname, 'resources')));

app.get('/', async (req, res) => {
  res.status(200).json(
    {
      message: 'Hello World'
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
