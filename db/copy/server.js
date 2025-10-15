const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/labdemo")
.then(()=>console.log("MongoDb Connected"))
.catch((err)=>console.log("error"));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    name1:String,
    name2:String,
    email: String,
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});


app.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedUser);
});


app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
});



app.listen(3000, () => console.log('Server running on http://localhost:3000'));
