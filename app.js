const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();
const port = 5000 || process.env.PORT;
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connecting mongoDB using 
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.mongoURI);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Defining User Schema
let ContactSchema = new mongoose.Schema({
    name: String,
    age:String,
    gender:String,
    email:String,
    phone:String,
    address:String,
    occupation:String,
    skills:String
  });

//Modelling of userschema or compilation of userschema
let contact = mongoose.model('Contact', ContactSchema);

app.set('view engine', 'pug')

app.use('/static',express.static('static'));

app.set('views',path.join(__dirname,'views'));

app.post('/submit',(req,res)=>
{
    let userData = new contact(req.body);
    userData.save().then(()=>
    {
        res.status(200).render('success.pug',{title:"EmployMe",message:"Your Details Saved Successfully"});
    }).catch(()=>
    {
        res.status(200).render('success.pug',{title:"EmployMe",message:"Oops!!! error occured"});
    })
});

app.get('/',(req,res)=>
{
    res.status(200).render('index.pug',{title: 'EmployMe'});
});

app.get('/connect',(req,res)=>
{
    res.status(200).render('contact.pug',{title: 'EmployMe'});
});

app.listen(port,(req,res)=>
{
    console.log(`app started at the port http://localhost:${port}`);
});