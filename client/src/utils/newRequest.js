// NEW REQUEST COMPONENT

import axios from "axios";





// it can be used as component so we dont have write them again and again
const newRequest =(accessToken)=> axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers:{
    "accessToken":accessToken
  },
  
  // withcredential is used to send cookies to our backend
  withCredentials: true,
});

export default newRequest;