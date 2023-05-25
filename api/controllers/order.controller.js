// ORDER CONTROLLER

import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js";
import Order from '../models/order.model.js';
import Stripe from 'stripe';




// MOST IMP PART OF PROJECT : STRIPE PAYMENT
// real createOrder function
export const intent = async (req, res, next) => {

    //our stripe secret key 
    const stripe = new Stripe(process.env.STRIPE);

    // finding the gig for getting its price 
    const gig = await Gig.findById(req.params.gigId);



// for checking whether order has been made and it hasnot been paid or completed
// making sure multiple unpaid or uncompleted order of same gig by same buyer isnot created in database
    const order = await Order.findOne({
        buyerId: req.userId,
        sellerId: gig.userId,
        title: gig.title,
        gigId: gig._id,
        isCompleted: false,

    });



    if (!order) {

        // creating our payment intent
        const paymentIntent = await stripe.paymentIntents.create({

            // we dont want to get price price from fronted , as they can be changed by client rather, we search price in gig in database
            amount: gig.price * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: paymentIntent.id,

        });

        await newOrder.save();

        return res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });

    };


    // if order is already existed which hasnot beeb paid
    const paymentIntent = await stripe.paymentIntents.retrieve(order.payment_intent);

    

    
    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    })




};





// CREATE THE ORDER
// JUST FOR TEST and LEARNING ONLY , react create order is from stripe fuction above
export const createOrder = async (req, res, next) => {

    try {

        // we should never take price from client as they can change it , instead we take gigId and find the gig and its price
        const gig = await Gig.findById(req.params.gigId);

        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: "temporary"

        });

        await newOrder.save();

        res.status(200).send("success in order");


    }

    catch (err) {
        next(err);
    }

};



// GETTING THE ORDER: only if isCompleted is true
export const getOrders = async (req, res, next) => {

    try {

        const orders = await Order.find({

            // setting SellerId an buyerId dynamically with userId from verifytoken to find the orders
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isCompleted: true
        });

        res.status(200).send(orders);



    }

    catch (err) {
        next(err);
    }

};


// UPDATING THE ORDER BY CHANGING 
export const confirm = async (req, res, next) => {

    try{

        const orders = await Order.findOneAndUpdate({ payment_intent:req.body.payment_intent},
            { $set:{
                isCompleted:true
            }
            
        }
        );
        
        res.status(200).send("Order has been confirmed");
    }

    catch (err) {
        next(err);
    }

};