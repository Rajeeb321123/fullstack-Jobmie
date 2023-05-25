import React from 'react';



import './ImageCard.scss';

const ImageCard = ({item}) => {
  return (

   
   

<div className="imageCard">
        <img src={item} alt="" />
       
    </div>
   
  
  )
}

export default ImageCard