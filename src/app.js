const express = require('express');
const connectDb = require('./config/database');
const UserModel = require('./models/user');

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    // creating a new instance of user model
    const user = new UserModel(req.body);
    await user.save().then(() => {
        res.status(201).send({ message: 'User created successfully' });
    }).catch((err) => {
        res.status(500).send({ message: 'Error creating user', error: err });
    })
});

connectDb().then(() => {
    console.log('Connected to database successfully');
    app.listen(7000, () => {
      console.log('Server is running on port 7000');
    });
}).catch((err) => {
    console.log('Error while connecting to database', err);
})



