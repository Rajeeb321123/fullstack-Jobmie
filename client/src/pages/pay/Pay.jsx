//MOST IMP PART OF THIS PROJECT: PAY PAGE


import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../../utils/newRequest';
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import Cookies from "js-cookie";

// key should be outside component
// no need to hide the key : it isnot secret key
// public key
const stripePromise = loadStripe("pk_test_51N9rINHenfvhOwyUc7fPHjCYBvmXW5IPMYcs1v6kwqdSV3SOzyIzRCZHBO4Fx6IQAgnI7jhAEwSZd2NJXxlzLyOs005WZqmWPz");

const Pay = () => {

    // we will getting it from backend as response 
    const [clientSecret, setClientSecret] = useState("");

    const { id } = useParams();
    const accessToken = Cookies.get("accessToken");

    // to run useEffect only once, for not letting making two data backend by our post method
    const effectRan= useRef(false);

   


    useEffect(() => {

      

        if (effectRan.current === false){

          const makeRequest = async () => {
            
            try{
              const res = await newRequest(accessToken).post(`/orders/create-payment-intent/${id}`);
              setClientSecret(res.data.clientSecret);
            }
            catch(err){
              console.log(err);
            }
            
          };
          makeRequest();
        
          return ()=>{

            effectRan.current = true;
          }
          

        }
    
    }, [])

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };
    
    

  return (
    <div className="pay">
         {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay
