//AUTH CONTROLLER
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";



// NOTE: req.userId and req.isSeller isnot directly fom client (unlike other req.body which is directly ) fom client but from middleware jwt we created where we take jwttoken from cookies of client and dcrypt it to userId and isSeller


// REGISTER
export const register = async (req, res, next) => {

    try {

        // encrpyt
        // 5 is just salt number
        const hash = bcrypt.hashSync(req.body.password, 5);

        const newUser = new User({

            ...req.body,
            password: hash,
        });


        await newUser.save();

        res.status(201).send("User has been created");
    }

    catch (err) {
        next(err);
    }


};



// LOGIN
export const login = async (req, res, next) => {

    try {

        // findOne because its unique
        const user = await User.findOne({ username: req.body.username });




        if (!user) return next(createError(404, "User Not Found"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(404, "Password Incorrect, fuck you hacker"));


        // IMP:GENERATING ACCESSTOKEN USING jwt TOKEN
        const token = jwt.sign({
            id: user._id,
            // we nee isSeller so seller can be allowed to write review
            isSeller: user.isSeller,


        }, process.env.JWT_KEY
        );


        // HOW TO SEND RESPONSE , WITHOUT PASSWORD FROM USER
        // removing the password from user and sending the info(just otherthing other than password) 
        const { password, ...info } = user._doc;


        // IMP: after deployment i found that cookies(especially httponly type) setting across different backend and frontend  domain is very risky so, no browser allow it so, dont use this
        // //IMP USING COOKIES 
        // res.cookie(
        //     "accessToken",
        //     token,
        //     // making user cookie or token can only changed using http server call , not other way
        //     { httpOnly: true, }
        // )
        //     .status(200)
        //     .send(info);


        // The easiest way to fix your problem would be to send back the cookie as a res object, and then setting the cookie manually in the frontend.
        return res.status(200).json({
            
            userInfo: info,
            accesstoken: token,
          });






        // // Response:info
        // // res.status(200).send(info);

    }

    catch (err) {
        next(err);
    }

};



// LOGOUT
export const logout = async (req, res) => {

    try {


        // for advance logout we have to use blacklist array and store logged out token
        // but this is a simple project

        // clearing the cookie , access token only
        res.clearCookie("accessToken", {

            // as our backend and client url eg: localhost 8800 and localhost:5173 are not same
            // so we have to say sameSite none to access the cookie
            sameSite: "none",
            secure: true,
            
        }).status(200)
        .send("Logged Out")
        
    }

    catch (err) {
        res.next(err);
    }

};