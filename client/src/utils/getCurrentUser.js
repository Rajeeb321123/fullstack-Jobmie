// FOR GETTINGT THE CURRENT USER from browser local storage


const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  };
  
  export default getCurrentUser