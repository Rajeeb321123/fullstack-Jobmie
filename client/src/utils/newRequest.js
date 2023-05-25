// NEW REQUEST COMPONENT

import axios from "axios";


// it can be used as component so we dont have write them again and again
const newRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  // withcredential is used to send cookies to our backend
  withCredentials: true,
});

export default newRequest;