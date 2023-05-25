// FOR UPLOADING


// for uploading to our cloudinary

import axios from "axios";

const upload = async (file) => {

  // FormData construct key value pair
  const data = new FormData();

  // creating our data before api request
  data.append("file", file);
  data.append("upload_preset", "jobmie");


  // api request
  try {
    //for cloudinary  api endppoint looks at reference of its doc
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);

    console.log(res.data)

    // getting url from response after posting the image
    const { url } = res.data;
    return url;
  } 
  
  catch (err) {
    console.log(err);
  }
};

export default upload;