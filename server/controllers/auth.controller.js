import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

  //fetch data from request
  const { username, email, password } = req.body;

  //validation

  if(!username || !email || !password){
    console.log("All fields are required*");
    return next(errorHandler(404 , "All fields are required*"));
  }

  //hash the password

  const hashedPassword = bcryptjs.hashSync(password, 10);
 
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created Successfully',
    });

  } catch (err) {
    next(err);
  }
};

export const signin = async (req ,res, next) => {

  const {email, password} = req.body;

  try{

    //check for  the given email is correct

    const validUser = await User.findOne({email});

    if(!validUser){
      
       return next(errorHandler(404 , "User  not found!"));
    }

    //Now check for the password

    const validPassword = bcryptjs.compareSync(password , validUser.password);

    if(!validPassword){
   
      return next(errorHandler(401, "Wrong credentials!"));
    }

    const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);


    //we doesnt want the password to send as a response in validUser so we do following thing
    const {password : pass,  ...rest} =  validUser._doc;


    res.cookie('access_token' , token , {httpOnly: true}).status(200).json({
      success: true,
      rest,
    })




  }catch(err){

   next(err);
  }

}

export const google = async(req , res, next) => {

  try{

    const user = await User.findOne({email: req.body.email});

    if(user){

      //if user exists , it means user do signin.

      const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET);

      const {password: pass , ...rest} = user._doc;

      res.cookie("access_token" , token , {httpOnly: true}).status(200).json({
        success: true,
        message: "User login Successfully",
        rest,
      })

    }else{

      //if user doesnt exist , it means user do signup.

      //generate a random password for the user who sign up from google

      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword , 10);

      const userName = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-3);

      const newUser = new User({username: userName , email: req.body.email , password: hashedPassword, avatar: req.body.photo});

      newUser.save();

      const token = jwt.sign({id: newUser._id} , process.env.JWT_SECRET);

      const {password:pass , ...rest} = newUser._doc;

      res.cookie("access_token" , token , {httpOnly: true}).status(200).json({
        success: true,
        message : "User Created",
        rest,
      })



    }

  }catch(err){
    next(err);
  }
  
}