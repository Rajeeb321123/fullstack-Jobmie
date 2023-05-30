// MY GIG page

import React from 'react';
import { Link } from 'react-router-dom';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


import getCurrentUser from '../../utils/getCurrentUser';

import './MyGigs.scss';
import newRequest from '../../utils/newRequest';
import Cookies from 'js-cookie';


const MyGigs = () => {

  const currentUser = getCurrentUser();

  const accessToken = Cookies.get("accessToken");
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest(accessToken).get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  



  const mutation = useMutation({

    // this is gigId
    mutationFn:(id) => {
      return newRequest(accessToken).delete(`/gigs/${id}`);

    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    }
  })


  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  
  return (
    <div className="myGigs">

{isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (


      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to =  '/add' >
            <button>Add new Gig</button>
          </Link >
        </div>
        <table>
          <tbody>

          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          { data.map((gig) =>(
            
            <tr key = {gig._id} >
            <td>
              <img className='image' src={gig.cover} alt="" />
            </td>
            <td>{gig.title}</td>
            <td>{gig.price}</td>
            <td>{gig.sales}</td>
            <td>
              <img  className='delete' src="/img/delete.png" alt="" onClick={()=>handleDelete(gig._id)} />
            </td>
          </tr>
            )) 
          }
          
          
      </tbody>
        </table>
      </div>
      )}
    </div>
  )
}

export default MyGigs