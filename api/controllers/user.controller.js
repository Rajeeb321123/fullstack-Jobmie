// USER CONTROLLER



import User from "../models/user.model.js";
import createError from "../utils/createError.js";



// NOTE: req.userId and req.isSeller isnot directly fom client (unlike other req.body which is directly ) fom client but from middleware jwt we created where we take jwttoken from cookies of client and dcrypt it to userId and isSeller

// DELETE THE USER
export const deleteUser = async (req, res, next) => {


    // finding user from params in HTTP url call
    const user = await User.findById(req.params.id);




    // user._id is in objectId eg like  ObjectId("6460c89a102b6d3f7a94c87e") not in string, so we need to change that to string only
    if (req.userId !== user._id.toString()) {
        return next( createError (403, "You cannot delete other accounts"));;
    }
  

    //After all the verification now we can delete the user
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");

}




// DELETE THE USER
export const getUser = async (req, res, next) => {


    // finding user from params in HTTP url call
    const user = await User.findById(req.params.id);




  

    
    
    res.status(200).send(user);






}