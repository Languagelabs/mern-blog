import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body; 
    if(!username || !email || !password || username === '' || email === '' || password === '' ){
       next(errorHandler(400, 'All field are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
     
    const newUser = new User({
        username, 
        email, 
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(200).json('Signup successful');

    } catch (error) {
        next(errorHandler(409, 'Conflicting data exists'))
    } 

};

export const signin = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password || email === '' || password === ''){
        return next(errorHandler(400, 'All fields are required'))
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(400, 'Password incorrect'))
        } 
        const token = jwt.sign({userID: validUser._id}, process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc
        
        res.status(200).cookie('access_token', token, {httpOnly: true} ).json(rest)

    }catch(error){
        next(error)
    }
}

export const googlesignin = async (req, res, next) => {
    const { email, username, profilePIC } = req.body
    
    try {
        const user = await User.findOne({email})
        if(!user){
            const newUsername = username.split(' ').join('').toLowerCase() + Math.random().toString(9).slice(-4);
            const generatedPassword = Math.random().toString(36).slice(-9) + Math.random().toString(36).slice(-9);
            const newPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = await User({
               username: newUsername,
               email: email,
               password: newPassword,
               picture: profilePIC, 
            })

            const res = await newUser.save() 
            const token = jwt.sign({UserID: newUser._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = newUser._doc
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest) 
        }else{
            const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = user._doc
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest) 
        }
    } catch (error) {
        next(error)
    }
}