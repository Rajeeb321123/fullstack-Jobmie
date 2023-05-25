// JWT MIDDLEWARE
import jwt  from "jsonwebtoken";
import createError from "../utils/createError.js";


export const verifyToken = (req,res, next) => {

     // checking the JWT token
     let token =req.header("accessToken");
 

    // checking the JWT token ( cookies can be access after deployed so use header instead)
    //   const token = req.cookies.accessToken;
     // checking if the token exist or not


    if(!token) return next(createError(401, "You arenot Anthenticated"));


    jwt.verify(token, process.env.JWT_KEY, async (err, payload,) => {
        // after verification of token with JWT KEY,
        // we need to verify payload.id from token(id,isSeller) with user._id from database
        // user._id is in objectId eg like  ObjectId("6460c89a102b6d3f7a94c87e") not in string, so we need to change that to string only
      
        if(err) return next(createError(403, "Token isnot correct"));

        // IMP: assigning userId with value for payload , so it can be use in other funciotns as req
        req.userId = payload.id;
        req.isSeller = payload.isSeller;

        // next will allow execution of next funtion after middleware ppass req to next function
        next()
       
    });

}