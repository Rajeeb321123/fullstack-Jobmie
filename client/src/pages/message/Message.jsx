// Chat or message page

import React from 'react';
import { Link, useParams } from 'react-router-dom';

import './Message.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import Cookies from 'js-cookie';


const Message = () => {


  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // getting the our created  custom conversation id
  const { id } = useParams();
  const{ recieverId }=useParams();


  const accessToken = Cookies.get("accessToken");
  // look at Reviews.jsx for useQueryClient description or look at tanstack react-query doc
  const queryClient = useQueryClient();

  // importing All the messages
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest(accessToken).get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });


   // look at Reviews.jsx for useMutation description or look at  tanstack react-query doc
// creating our message
   const mutation = useMutation({
    
    mutationFn: (message) => {
      
      return newRequest(accessToken).post(`/messages`,message);
    },
    onSuccess: () => {

      queryClient.invalidateQueries(["messages"]);
    },
  });



  const {
    isLoading: isLoadingReciever,
    error: errorReciever,
    data: dataReciever,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest(accessToken).get(`/users/${recieverId}`).then((res) => {
        return res.data;
      }),

      // enable this userQuery call only the userId exist
    enabled: !!recieverId,
  });

  

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc : e.target[0].value,
    });

    // we want make test are empty after we click send at the end
    e.target[0].value = "";
  };
  
  
  
  return (
    
    <div className="message">
      {isLoadingReciever
                ? "loading"
                : errorReciever
                    ? "Something went wrong!"
                    :(

            
            
                    
      <div className="container">
        <span className="breadcrumbs">
          <Link to='/messages'>MESSAGES</Link>&gt;{dataReciever.username}&gt;
        </span>

        {isLoading ? (
          "loading"
          ) : error ? (
            "error"
            ) : (
              
              <div className="messages">

            {data.map(m => (
              
              
              <div className={m.userId === currentUser._id? `item owner`: `item` } key={m._id}>
                <img src={m.userId === currentUser._id? currentUser.img ||`/img/noavatar.jpg`: dataReciever.img||`/img/noavatar.jpg`} alt="" />
                <p>
                 {m.desc}
                </p>
              </div>
            ))}
            

            <hr />

            <form className="write" onSubmit={handleSubmit}>
              <textarea name="" placeholder='write a message' id="" cols="30" rows="10"></textarea>
              <button type='submit'>Send</button>
            </form>
          </div>
        )}

      </div>
       )}
    </div>
   
  );
}

export default Message