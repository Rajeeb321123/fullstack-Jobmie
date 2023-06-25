// PAGE FOR EACH GIG

import React from 'react';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ImageCard from '../../components/imageCard/ImageCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Reviews from '../../components/reviews/Reviews';
import Cookies from 'js-cookie';


import './Gig.scss';
const Gig = () => {

  // for getting the url
  // if url is http://localhost:5173/gig/646358d0413e1f33a2df3146 (or /gig/:id )  then param will return id:646358d0413e1f33a2df3146
  const params = useParams();
  // this is Gig id when we click on gig on gigs page
  const { id } = params;
  const accessToken = Cookies.get("accessToken");

  // REACT-QUERY: look at its doc
  // FOR GIG ID
  const { isLoading, error, data, } = useQuery({
    
    // VERY VERY VERY IMP queryKey must be unique otherwise weird fetch errir occurs . Took me a month to solve this issue
    queryKey: [id],
    queryFn: () =>
      newRequest(accessToken).get(`/gigs/single/${id}`).then((res) => {
        return res.data
      })
  });

  // getting userId from gig data
  const userId = data?.userId;

  // USING  userId of Seller From Data we got form Gig Id
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest(accessToken).get(`/users/${userId}`).then((res) => {
        return res.data;
      }),

    // enable this userQuery call only the userId exist
    enabled: !!userId,
  });

  










  return (
    <div className="gig">
      {isLoading ? "Loading" : error ? "SomeThing went wrong" :
        <div className="container">

          {/* LEFT SIDE */}
          <div className="left">
            <span className="breadcrumbs">JOBMIE. &gt; GRAPHICS & DESIGN &gt;</span>
            <h1>{data.title}</h1>

            {isLoadingUser ? ("loading Seller") : errorUser ? "Something Went wrong" : (


              <div className="user">
                <img className='pp' src={dataUser?.img ? dataUser.img : "/img/noavatar.jpg"} alt="" />
                <span>{dataUser.username}</span>

                {/* STARS  */}
                {!isNaN(data.totalStars / data.starNumber) &&
                  <div className="stars">
                    {/* USING ARRAY METHOD FOR MAPPING THE STARS */}
                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}

                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                }
              </div>
            )}


            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={120}
              totalSlides={data.images.length}

            >
              <Slider>
                {data.images.map(img => (
                  <Slide
                    key={img}
                  >
                    <ImageCard item={img} />
                  </Slide>
                ))}
                {/* <Slide><ImageCard item={"https://mpost.io/wp-content/uploads/image-74-7-1024x1024.jpg"} /></Slide>
              <Slide ><ImageCard item={"https://cdn.pixabay.com/photo/2023/03/05/19/26/ai-generated-7832098_960_720.jpg"} /></Slide> */}
                {/* <Slide index={2}>I am the third Slide.</Slide> */}
              </Slider>
              <ButtonBack>Back</ButtonBack>
              <ButtonNext>Next</ButtonNext>
            </CarouselProvider>







            <h2>About This Gig</h2>

         
            <p>
              {data.desc}
            </p>

            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img className='pp' src={dataUser?.img || "/img/noavatar.jpg"} alt="" />
                <div className="info">
                  <span>{data.user}</span>
                  {!isNaN(data.totalStars / data.starNumber) &&
                    <div className="stars">
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <span>{Math.round(data.totalStars / data.starNumber)}</span>
                    </div>
                  }
                  <button>Contact Me</button>

                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className='title'>From</span>
                    <span className="description">{dataUser?.country ? dataUser.country : "No country provided by seller"}</span>
                  </div>
                  <div className="item">
                    <span className='title'>Member since</span>
                    <span className="description">Aug 3001</span>
                  </div>
                  <div className="item">
                    <span className='title'>Avg. respnse time</span>
                    <span className="description">4 hours</span>
                  </div>
                  <div className="item">
                    <span className='title'>Last delivery</span>
                    <span className="description"> 2 day</span>
                  </div>
                  <div className="item">
                    <span className='title'>Language</span>
                    <span className="description">English</span>
                  </div>
                  <div className="item">
                    <span className='phone'>Phone</span>
                    <span className="description">{dataUser?.phone ? dataUser.phone : "no number"}</span>
                  </div>
                </div>

                <hr />

            
                {dataUser?.desc ? dataUser.desc : "No Description provided by seller"}

              </div>


            </div>


            {/* REVIEW */}
            <Reviews gigId={id} />
          </div>





          {/* RIGHT SIDE */}
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>

            {/* for features */}
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* naviaget to pay page */}
            {/* id is gig id */}
            {
              !!accessToken ? <Link to={`/pay/${id}`}>
                <button >Continue</button>
              </Link>
                :
                (
                  <div className='g'>
                    Log In for Stripe payment order
                  </div>
                )
            }

          </div>
        </div>}
    </div>
  )
}

export default Gig