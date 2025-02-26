import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success:false, message:"user Doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });

    }

}

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async(req,res) => {
    const {name, password, email} = req.body;
    try{
        // checking the user is already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"user already exists"})
        }
        // validating email format & strong password
        if (!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"please enter a strong password"})
        }

        // hashing user password(password encrypt)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name: name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({success:true,token}); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }

}

export {loginUser, registerUser}
