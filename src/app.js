const express = require('express');
const app = express();

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});



app.use("/hello", (req, res) => {
  res.send('Hello, Bapuray');
})

app.use("/test", (req, res) => {
  res.send('Hello, I am from test route!');
})

app.use("/", (req, res) => {
  res.send('Hello, Root!');
})

