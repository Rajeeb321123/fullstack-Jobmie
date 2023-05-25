// MY Orders page

import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import newRequest from '../../utils/newRequest';
import './Orders.scss';

const Orders = () => {

  // retrieve the current user form localhost
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();


  // REACT-QUERY: look at its doc
  // refetch is amazing advantage of react query
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data
      })
  });


  // When we click message icon in order
  const handleContact = async (order)=>{

    const sellerId = order.sellerId;
    const buyerId = order.buyerId;

    const id = sellerId + buyerId;

    try{
      const res = await newRequest.get(`/conversations/single/${id}`);
      // we navigate to message page
      // id is our custom id not _id
      navigate( `/message/${res.data.id} ` )
    }
    catch(err){
      // if conversation doesnot exist ye i.e error response is 404: means no conversation (our own created eror  in backend )
      if(err.response.status === 404 ){
        // we create a new conversation
        const res = await newRequest.post(`/conversations`,{
          // to is only body we send for createConversation
          to: currentUser.sellerId ? buyerId : sellerId
        });
        navigate( `/message/${res.data.id} ` ) 

      }
    }
    

  };

  return (
    <div className="orders">
    {isLoading ? (
      "loading"
    ) : error ? (
      "error"
    ) : (
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tbody>

          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
          {data.map((order) => (
            <tr key={order._id}>
              <td>
                <img className="image" src={order.img} alt="" />
              </td>
              <td>{order.title}</td>
              <td>{order.price}</td>
              <td>
                <img
                  className="message"
                  src="./img/message.png"
                  alt=""
                  onClick={() => handleContact(order)}
                  />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
};

export default Orders