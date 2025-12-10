const express = require('express');
const connectDb = require('./config/database');
const UserModel = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    return res.status(200).send({ message: 'Login successful' });
  }catch(err){
    return res.status(400).send({ message: err.message });
  }
});

app.post('/signup', async (req, res) => {
    // creating a new instance of user model
    try{
        validateSignupData(req);
        const { firstName, lastName, email, password } = req.body;
        //encrypt the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = new UserModel({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
        
        await user.save().then(() => {
            res.status(201).send({ message: 'User created successfully' });
        }).catch((err) => {
            res.status(500).send({ message: 'Error creating user', error: err.message });
        })
    }catch(err){
        return res.status(400).send({ message: err.message });
    }
    
});

// Get an user matching email ID
app.get('/user', (req, res) => {
    const userEmail = req.body.email
    UserModel.find({email: userEmail}).then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send({ message: 'Error fetching users', error: err });
    });
});

app.delete('/user', (req, res) => {
    const userId = req.body.userId

    UserModel.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ message: 'User deleted successfully' });
    }).catch((err) => {
        res.status(500).send({ message: 'Error deleting user', error: err });
    });
});

app.patch('/user', (req, res) => {
    UserModel.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.status(200).send({ message: 'User updated successfully' });
    }).catch((err) => {
        res.status(500).send({ message: 'Error updating user', error: err });
    });
})

// Get all the users from API
app.get('/feed', (req, res) => {
    UserModel.find().then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send({ message: 'Error fetching users', error: err });
    });
});

connectDb().then(() => {
    console.log('Connected to database successfully');
    app.listen(7000, () => {
      console.log('Server is running on port 7000');
    });
}).catch((err) => {
    console.log('Error while connecting to database', err);
})



