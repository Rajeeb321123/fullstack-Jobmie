
// Controller CONTROLLER
// mostly for messages page in client

import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";


// CREATE THE CONVERSATION
export const createConversartion = async (req,res, next ) => {

   const newConversation = new Conversation({

      // IMP:
      // to is id we get client ( can be seller or buyer id)
      // id: will be like combination of  'sellerId + buyerId' eg:64636cfb41f93023c9bd499264621ddcad314b835703de4b
      // remember we created like if seller id is ' seller id to '  or in case of buyer id is 'to buyer id '. it has to be in this format

      // note: its our own custom id ,it isnot _id given by mongo db
      // custom id helps to find conversation between buyer and seller easily with their id
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,

      // When ever we create the conversation : it automatically make read by whoever (Seller or Buyer) true 
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,


   });

   try {

      const savedConversation = await newConversation.save();

      res.status(201).send(savedConversation);
   }

   catch (err) {
      next(err);
   }

};



// UPDATE READ : when we hit mark as read
// UDATING the conversation by revciever as Mark as Read
export const updateConversation = async (req,res, next ) => {


   try {

      // id: sellerId+buyerId
      const updateConversation = await Conversation.findOneAndUpdate({ id: req.params.id } ,
         
         {
            // we click on marked read
            $set:{
               // readBySeller:true ,
               // readByBuyer:true ,
               // better way is like this (but results same)
               //here we provide authToken from reader account
               ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
            },
         },
         // for seeing the new conversation afre update
         {new: true}
      );

      res.status(200).send(updateConversation);


   }


   catch (err) {
      next(err);
   }

};




// getting the single Conversation
export const getSingleConversation = async (req,res, next ) => {


   try {

      const conversation = await Conversation.findOne({ id:req.params.id })

      // Using this error response can cerate new CreateConversation in client side: we can use either status or message , we had use status 404 in client
      if(!conversation) return next( createError( 404, "Conversation Not Found"))


      res.status(200).send(conversation);

   }

   catch (err) {
      next(err);
   }

};



// GET all  CONVERSATIONS of seller or buyer with anyone
export const getConversations = async (req, res, next ) => {

   try {

      const conversations = await Conversation.find(
         req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
      )
      // to sort for latest conversation  before sending as response to messages page 
      // sort is needed as we constantly change lastmessage of conversation as new messges are sent 
      .sort({ updatedAt: -1 });

      res.status(200).send(conversations);
      

   }

   catch (err) {
      next(err);
   }

};





