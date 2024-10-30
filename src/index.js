import express from 'express'
import dotenv from 'dotenv';
import connectDB from './connect.js';
import auth from './routes/auth.js';
import mongoose from 'mongoose';
const { mongo } = mongoose;
import session from 'express-session';
import passport from 'passport';
import './passport.js';
dotenv.config({path: './.env'});
const app = express()
connectDB()
.then(()=>{
  app.listen(process.env.PORT,()=>{
      console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch((error)=>{
  console.log(error);
  process.exit(1);
});
app.get('/',(req,res)=>{
  res.send("Hello World");
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth',auth);


