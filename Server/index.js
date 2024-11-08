const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const PORT = process.env.PORT || 5000;
// const bcrypt = require('bcrypt')
 const dotenv = require('dotenv')
 const cookieParser = require('cookie-parser');

 const userRoutes = require('./routes/userRoutes');
const { Signup, Login, userVerification, fetchAllUsers } = require("./Controllers/AuthController");

 


 dotenv.config()
const app = express()
app.use(express.json())

app.use(cookieParser());
app.use(


    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  mongoose
  .connect("mongodb://localhost/mern-stack-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

// app.post('/login', (req, res) => {
//     const {email, password} =req.body;
//     EmployeeModel.findOne({email:email})
//     .then(user=>{
//         if(user){
//             if (user.password===password){

//             }else{
//                 res.json("the password is incorrect")
//             }
//         }else{
//             res.json("No record existed")
//         }
//     })
// })
app.get('/', (req, res) => res.send('Hello world!'));

app.post('/register', Signup )
app.post('/login', Login )
app.use('/api', userRoutes);
app.get('/api/users', fetchAllUsers);



app.listen(PORT,() =>{
    console.log("server is running",PORT)
})



app.post("/deleteUser", async(req, res)=>{
    const {userid}  = req.body;
    try{
      User.deleteOne({_id: userid}, function (err,res){
        console.log(err);
      });
      res.send({ status: "ok", data:"Deleted "});
    }catch(error){
      console.log(error);
    }
  
    });