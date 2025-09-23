import User from "../models/Schema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Car from "../models/Car.js"

// Pass the user ID as an object in the payload.
const generateToken=(id)=>
{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Good practice to add an expiration time
    })
}

// ... rest of the code is largely the same
export const registerUser=async(req,res)=>
{
   try {
     const {name,email,password}=req.body;
     if(!name||!email||!password||password.length<8)
     {
        return res.json({success:false,message:"Fill the field"});
     }

     const userExits=await User.findOne({email});
     if(userExits)
     {
        return res.json({success:false,message:"User already Exits"})
     }
     const hashedPassword=await bcrypt.hash(password,10);
     const user=await User.create({name,email,password:hashedPassword});
     const token=generateToken(user._id.toString());
     res.json({success:true,token})

   } catch (error) {
      console.log(error.message);
      res.json({success:false,message:error.message})
   } 
}

// ... rest of the code is largely the same
export const loginUser=async(req,res)=>
{
  try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user)
    {
        return res.json({success:false,message:"User not found"})
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        return res.json({success:false,message:"Password does not match"})
    }
    const token=generateToken(user._id.toString());
    res.json({success:true,token})
    
  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
  }
}

//get user data using jwt Token
export const getUserData=async(req,res) =>
{
    try {
        const {user}=req;
        res.json({success:true,user})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error})
    }
}

export const getCars=async(req,res)=>
{
    try {
      const cars=await Car.find({isAvailable:true}); // Changed from available to isAvailable
      res.json({success:true,cars})
     }catch (error) {
        console.log(error.message)
        res.json({success:false,message:error})
    }
}