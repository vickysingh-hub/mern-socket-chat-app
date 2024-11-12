import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const Signup = async (req,res) => {
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Oops..Password don't match"})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        //Hash Password here
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic:girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in Signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login = async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcryptjs.compare(password,user?.password||"");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in LogIn controller", error.message);
        res.status(400).json({error:"Internal Server Error"})
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message:"Logged Out Successfully!"});
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}