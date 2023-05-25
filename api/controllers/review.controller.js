// Controller for Reviews

import Review from '../models/review.model.js';
import Gig from '../models/gig.model.js';
import createError from '../utils/createError.js';






// createReview
export const createReview = async (req, res, next) => {

    // if seller we cant create the review
    if (req.isSeller) return next(createError(403, "Seller cant create a review"));

    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    });

    try {

        //  we shouldnot be allowed to write more than 1 review
        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId,
        });
        if (review) return next(createError(403, "You have already reviewd the gig"));


        const savedReview = await newReview.save();

        // IMPORTANT WE ARE UPDATING OUR GIG with STARS
        // incrementing our totalStars and starNumber usin $inc
        await Gig.findByIdAndUpdate(
            req.body.gigId, { $inc: { totalStars: req.body.star, starNumber: 1 } }
        );




        res.status(201).send(savedReview);


    }

    catch (err) {
        next(err);
    }

}


// getReviews
export const getReviews = async (req, res, next) => {

    try {
        // getting the review in accordance to gigId
        const reviews = await Review.find({ gigId: req.params.gigId });

        res.status(201).send(reviews);
    }

    catch (err) {
        next(err);
    }

}


// DELETE THE review
export const deleteReview = async (req, res, next) => {

    try {

    }

    catch (err) {
        next(err);
    }

}