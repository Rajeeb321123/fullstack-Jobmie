// CONTROLLER FOR GIG

import Gig from '../models/gig.model.js';
import createError from '../utils/createError.js';


// NOTE: req.userId and req.isSeller isnot directly fom client (unlike other req.body which is directly ) fom client but from middleware jwt we created where we take jwttoken from cookies of client and dcrypt it to userId and isSeller

// CREATEGIG
export const createGig = async ( req, res, next ) => {

  

    // only seller can create gig
    if ( !req.isSeller ) return next(createError(403,"Only Sellers can create a gig! "));

    const newGig = new Gig({

        // we use req.userId from jwt middleware because for correct userId from accessToken
        // assigning userId to each individual gig
        userId: req.userId,
        ...req.body,
    });


    try{
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    }
   
   catch(err){
    next(err);
   }

};




// DELETE SINGLE GIG
export const deleteGig = async (req, res, next) => {
    try {
      const gig = await Gig.findById(req.params.id);
      if (gig.userId !== req.userId)
        return next(createError(403, "You can delete only your gig!"));
  
      await Gig.findByIdAndDelete(req.params.id);
      res.status(200).send("Gig has been deleted!");
    } catch (err) {
      next(err);
    }
};






// FOR GETTING SINGLE GIG
export const getGig = async ( req, res, next ) => {

   try{
    const gig = await Gig.findById(req.params.id);

    // note: we dont need to check with jwt token userId to get Gig (i.e we can get any user Gig)

    if(!gig) next(createError(404,"Gig not found"));

    res.status(200).send(gig)
    
   }

   catch(err){
    next(err)

   }

};




// GET ALL THE GIG 
export const getGigs = async ( req, res, next ) => {


// MOST IMP : FILTERS
    // for filtering the data with cat(category), sort by, search
    
    // example of query in url is http:localhos:8800/gigs?cat=ai , here cat=ai is query ,
    // for multiple query ,just use & http:localhos:8800/gigs?cat=ai&serach=Gig 3&sort=price
    // query
    const q = req.query;



    // regex provide way to write regular expression eg : name:{$regex:"Gig 2"}

    // filters variables
    const filters ={

        // && helps to get gigs even if there isno query 
        // ... helps for query for category or cat only one time , more than one is neglected for cat
        ...(q.cat && {cat:q.cat}),

        // userId filter is used in client when click on user or seller
        // for myGigs page in seller account
        ...(q.userId && { userId :q.userId}),


        // look at min and max query below, very imp. syntax like below allow query with only min or max or with both
        ...((q.min || q.max ) && {
            price:{ ...(q.min && { $gt:q.min }), ...(q.max && { $lt:q.max })}
        }),

        // options : 'i' so it isont lower or upper case sensitive
        // regex allow regular expression for serach
        ...(q.search && {title:{$regex:q.search, $options: 'i' }}),
    }


   try{


    // finding all the gig
    // IMP: sort is for sorting eg: .sort({ price:-1}) will sort by highest  price
    if(q.sort==='price'){
      const gigs = await Gig.find().sort({ [q.sort]:1 });
      res.status(200).send(gigs);
    }
    else{
      const gigs = await Gig.find(filters).sort({ [q.sort]:-1 });
      res.status(200).send(gigs);
    }
    

    
   }

   catch(err){
    next(err)

   }

};



// GET 9 THE GIG 
export const get9Gigs = async ( req, res, next ) => {




   try{


      const gigs = await Gig.find().sort({ created_at:1 }).limit(9);
      res.status(200).send(gigs);
    }

    

    
   

   catch(err){
    next(err)

   }
};









