const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();

async function connectDB(){
    await mongoose.connect('mongodb://127.0.0.1:27017/brtest');
    console.log('db connected')
}

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false,
      unique: false
    },
    password: {
      type: String,
      required: false
    },
    Message:{
        type:String,
    }
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;  

connectDB().catch((err)=>{
    console.log(err);
})

app.use(cors());
app.use(bodyParser.json());


app.post("/demo", async (req,res)=>{
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.message=req.body.message
    const doc = await user.save();
    console.log(req.body)
    res.json(req.body)
})

  // Define a route to handle requests for the data
  app.get('/users', async (req, res) => {
    try {
        const data = await User.find().exec();
        console.log(data);
        res.json(data);
      } catch (err) {
        console.error(err);
      }
  });
   

app.listen(8080,()=>{
    console.log("Server started at 8080")
})