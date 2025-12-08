const express = require('express');
const app = express();

app.get("/user", (req, res) => {
  res.send({name: 'Bapuray', age: 24});
})

app.post("/user", (req, res) => {
  res.send('User created successfully!');
})

app.use("/test", (req, res) => {
  res.send('Hello, I am from test route!');
})

// app.use("/", (req, res) => {
//   res.send('Hello, Root!');
// })


app.listen(7000, () => {
  console.log('Server is running on port 7000');
});

