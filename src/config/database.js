const mongoose = require('mongoose');

const connetDb = async() => {
    await mongoose.connect('mongodb+srv://bapuray:ysU4rUHskZwaHpC8@nodelearning.uhhmudf.mongodb.net/devTinder')
}

module.exports = connetDb;