// MESSAGE CONTROLLER
// for mostly message page in client page

import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js"; 


// CREATE THE Message
export const  createMessage= async ( req, res, next ) => {
   
   const newMeMessage = new Message ({ 

      conversationId:req.body.conversationId,
      userId: req.userId,
      desc: req.body.desc

   });

   try{
      
      const savedMessage = await newMeMessage.save();
      // initially updating conversation read by sender true and read by reciever false
      await Conversation.findOneAndUpdate( { id:req.body.conversationId },{
         $set:{
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
            lastMessage: req.body.desc,
         },
      },
         {new : true}
      );

      res.status(201).send(savedMessage);
   }

   catch(err){
      next(err);
   }
   
};



// GET MESSAGE
export const getMessages = async ( req, res, next ) => {
   
   try{
   const messages = await Message.find({ conversationId: req.params.id });

   res.status(200).send(messages);

   }

   catch(err){
      next(err);
   }
   
};



