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
