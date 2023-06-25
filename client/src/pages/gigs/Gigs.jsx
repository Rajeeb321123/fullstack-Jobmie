// GIGS PAGE


import React, { useEffect, useRef, useState } from 'react';

import GigCard from '../../components/gigCard/GigCard';
import newRequest from '../../utils/newRequest';

import './Gigs.scss';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// for Alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import { setRendercomGigs } from '../../state';



const Gigs =() => {

    
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("createdAt");
  const [querySearch  , setQuerySearch   ] = useState("")
 

  
  const maxRef = useRef();
  const minRef = useRef();

  // using react router dom to get location or url
  const location = useLocation();
  // search is like ?cat=desig&price=300
  // search url string begining after ?
  const { search } = location;

  
  // getting only value for search= and cat= from Search string  or url 
  const params = new URLSearchParams(search);
  const searchFor = params.get("search");
  const cat= params.get("cat");

 
  const accessToken = Cookies.get("accessToken");
 
  // REACT-QUERY: look at its doc
  // refetch is amazing advantage of react query
  const { isLoading, error, data , refetch} = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest(accessToken).get(`/gigs?cat=${cat?cat:""}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}&search=${querySearch === "" && searchFor!== null ?searchFor : querySearch}`).then((res) => {
        return res.data
      })
  });

  console.log("404 error is because of render.com free version . Please wait for some time")


  const rendercomGigs = useSelector((state)=>state.global.rendercomGigs);
  const dispatch = useDispatch();
   const MySwal = withReactContent(Swal)
 
 useEffect(() => {
 
   if (rendercomGigs === true){
     MySwal.fire({
       icon: 'info',
       title: 'Stuck in loading gigs: due free version of render.com ',
       text: 'Web Services on the free instance type are automatically spun down after 15 minutes of inactivity. Wait for some time as web service is restarting (free instance spins up) in render.com. Try reloading if stucked of long time. source:https://render.com/docs/free',
       
     })
   }

   
 
   return ()=>{
 
     dispatch(setRendercomGigs);
   }
     
 }, [MySwal,dispatch,rendercomGigs])
 
  


  







  // for applying the search and min and max value
  const apply=()=>{
    
    // refectch is from react-query
    refetch();
  };

  

  const reSort = (type) =>{
    setSort(type);
    setOpen(false);
  }

  

  useEffect(() => {


    // refetching the gig whenever sort by changes
    refetch();
  
  },[sort])

  useEffect(() => {

      if( data ){
        console.log("loading success")
      }
  },[data]);


  

  return (
    <div className="gigs">

      <div className="container">
        <span className="breadcrumbs">JOBMIE. &gt; GRAPHICS & DESIGN &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Johmie's AI artists
        </p>

        {/* MENU */}
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' ref={minRef} />
            <input type="text" placeholder='max'  ref={maxRef}/>
            <button  onClick={apply} >Apply</button>
          </div>

          <div className="middle">

          <div className="searchInput">

<input type="text"
    placeholder='Search for Gigs....'
    onChange={(e) => setQuerySearch(e.target.value)}
    // onKeyUp={apply} 
    />

<button onClick={apply}>Search</button>
</div>
    </div>

          <div className="right">
            <span className='sortBy'>SortBy</span>
            <span className="sortType">{sort === "price" ? "Best Price" : "Newest" }</span>
            <img src="./img/down.png" alt="" onClick={()=> setOpen(!open)} />
           { open && (<div className="rightMenu">
              
              { sort === "price" ?  
              (<span  onClick={ ()=> reSort( "createdAt" )} >Newest</span>) :
              <span onClick={ ()=> reSort( "price" ) } >Best Price</span>}
            </div>)}

          </div>
        </div>

        {/* CARDS */}
        <div className="cards">

          {isLoading ? "Loading Gigs" : 
          error ? "Something went wrong" : 
            
              (data.map( (gig) => (
              <GigCard key={gig._id} item={gig} />
              )
            ))
          }
        </div>




      </div>
    </div>
  );
}

export default Gigs