import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

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
