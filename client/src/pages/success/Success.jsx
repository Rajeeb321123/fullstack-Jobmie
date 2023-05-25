// AFTER Payment is success


// IMP NOTE: in success page we get payment_intent= some value and other intent and  succeed status at the end or url
// using payment intend we can change or update the orders in backend to  ( isCompleted : true)
// only if isCompleted : true , order is seen in order page of buyer and seller

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";


const Success = () => {

  const { search } = useLocation();
  const navigate = useNavigate();

  // getting only payment intend from Search or url 
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        // sending our payment intent 
        const success = await newRequest.put("/orders", { payment_intent });

        console.log(success)


        // wait time out before navigateing to orders page
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};


export default Success;