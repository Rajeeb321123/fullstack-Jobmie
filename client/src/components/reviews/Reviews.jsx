import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React  from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

import Cookies from "js-cookie";


const Reviews = ({ gigId }) => {

    
    const accessToken = Cookies.get("accessToken");

    // for updating the frontend after mutation call for writing review to backend : The useQueryClient hook returns the current QueryClient instance.
    // it uses cacheing so remember, queryKey in useQuery most be unique for each post review in Review.jsx otherwise name of user for review become same for all untill we reload the page (means no live update for review user name ): SO WE ARE USING review.userId in Review .jsx ( not here)
    const queryClient = useQueryClient()

    const { isLoading, error, data, refetch} = useQuery({
        queryKey: ["reviews"],
        queryFn: () =>
            newRequest(accessToken).get(`/reviews/${gigId}`).then((res) => {
                return res.data;
            }),
    });


    // For writing the review and star
    const handleSubmit = (e) => {
        e.preventDefault();

        // target[0] means first element of form : text area
        const desc = e.target[0].value;
        // target[1] means second element of form : star
        const star= e.target[1].value;
        
        // we are sending them as props as review 
        mutation.mutate({ gigId, desc, star });
    }

    

    // Mutaion hook from react query tanstack :Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects
    const mutation = useMutation({
        mutationFn: (review) => {
            
            // we are passing our review prop or IMP: review is request or req to backend
          return newRequest(accessToken).post('/reviews', review)
        },

        // refetch or update reviews part in frontend:
        // invalidateQuery:The invalidateQueries method can be used to invalidate and refetch single or multiple queries in the cache based on their query keys or any other functionally accessible property/state of the query
        onSuccess:() => 
        // reviews is the queryKey of above Query call or useQuery
        queryClient.invalidateQueries(["reveiws"])
        
      });

      refetch();

    
    //   const justReRender= ()=>{
    //     refetch();
    //   }


    const optionStar=
    ["&#9733;",
    "&#9733;&#9733;",
    "&#9733;&#9733;&#9733;",
    "&#9733;&#9733;&#9733;&#9733;",
    "&#9733;&#9733;&#9733;&#9733;&#9733;",

]
    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {isLoading
                ? "loading"
                : error
                    ? "Something went wrong!"
                    :

                    // passing our each review to Review. jsx
                    data.map((review) => <Review key={review._id} review={review} />)}
            <div className="add">
                <h3>Add a review</h3>
                <form action="" className="addForm"  onSubmit={handleSubmit}>
                    <input type="text" placeholder="write your opinion" />
                    <select name="" id="">
                        <option value={1}>1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9733;</option>
            <option value={2}>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9733;&#9733;</option>
            <option value={3}>3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9733;&#9733;&#9733;</option>
            <option value={4}>4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9733;&#9733;&#9733;&#9733;</option>
            <option value={5}>5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9733;&#9733;&#9733;&#9733;&#9733;</option>

                        
                    </select>
                    <button type="submit" >Send</button>
                </form>
            </div>
        </div>
    );
};

export default Reviews;