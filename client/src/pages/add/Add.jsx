import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Add = () => {

  const accessToken = Cookies.get("accessToken");

  // const [singleFile, setSingleFile] = useState(undefined);
  // const [files, setFiles] = useState([]);
  // const [uploading, setUploading] = useState(false);

  // const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // const handleChange = (e) => {
  //   dispatch({
  //     type: "CHANGE_INPUT",
  //     payload: { name: e.target.name, value: e.target.value },
  //   });
  // };
  // const handleFeature = (e) => {
  //   e.preventDefault();
  //   dispatch({
  //     type: "ADD_FEATURE",
  //     payload: e.target[0].value,
  //   });
  //   e.target[0].value = "";
  // };

  // const handleUpload = async () => {
  //   setUploading(true);
  //   try {
  //     const cover = await upload(singleFile);

  //     const images = await Promise.all(
  //       [...files].map(async (file) => {
  //         const url = await upload(file);
  //         return url;
  //       })
  //     );
  //     setUploading(false);
  //     dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const navigate = useNavigate();

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (gig) => {
  //     return newRequest(accessToken).post("/gigs", gig);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["myGigs"]);
  //   },
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   mutation.mutate(state);
  //   // navigate("/mygigs")
  // };

  
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  // tracking our uploading process
  const [uploading, setUploading] = useState(false);
  




  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // for non array text inputs
  const handleChange = async(e) =>{

    
    dispatch({
      type:"CHANGE_INPUT",
      payload: {name:e.target.name, value: e.target.value}
    })
  }

  // For array inputs like features
  const handleFeature = (e) => {

    // we dont want to refresh the page here
    e.preventDefault();

    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value
    });

    // we want empty the feature after each feature added in reducer so we can add another feature again and again
    e.target[0].value="";

  };

  // handle upload of multiple for images gig and single cover for gig
  const handleUpload = async () => {
    
    setUploading(true);

    try{
      
      // for cover
      const cover = await upload( singleFile)

      // for gig images
      const images = await Promise.all(
        // look at the console.log of multiple files  , it is not array but its fileList so change into array
        // we cannot map fileList , only array can be mapped or iterate
        // we are using =>{} instead of =>() as it is js element 
        [...files].map(async (file) => {
          // uploading in file
          const url = await upload(file);
          return url;
      }) 
      );

      // unshift will add cover image url at begining of images array
       images.unshift(cover);


      setUploading(false);
      dispatch({type: "ADD_IMAGES", payload: { cover, images:images}});



    }
    catch(err){
      console.log(err);
      setUploading(false);
    }
  };

 




  // IMP: to know about list and array and how to interchange
  // to know FileList and File array
  // console.log(files);
  // console.log([...files]);


  // IMP FOR SUBMITTING REDUCER STATE TO BACKEND
     const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest(accessToken).post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs")
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>

            <input
              type="text"
              // name is imp as we are using it as payload in reducer
              name="title"
              placeholder="e.g. I will do something I'm really good at"
            onChange={handleChange}
            />
            

            {/* name is imp as we will using action.payload.name in reducer */}
            <label htmlFor="">Category</label>
            <select name="cat" id="cat"  defaultValue={"design"} onChange={handleChange}>
              <option value="design" >Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="ai">Ai</option>
            </select>


            <div className="images">
              <div className="imagesInputs">

                {/* CoverImage */}
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={e=>setSingleFile(e.target.files[0])}

                />

                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  // multiple for multiple input
                  multiple
                  onChange={e=>setFiles(e.target.files)}

                />
              </div>
              <button  onClick={handleUpload}>
                {uploading?"Uploading..":"Upload"}
              </button>
            </div>

            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}

            >

            </textarea>

            
            <button onClick={handleSubmit}>Create</button>


          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"

              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>


            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange}/>

            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}

            />

            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature} >
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>

            {/* to show the added features and remove on click */}
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>

                  {/* delete button */}
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}

                    {/* delete or "X" */}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number"  name="price"  onChange={handleChange}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;