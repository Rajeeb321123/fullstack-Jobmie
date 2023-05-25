// Reducer for gig
// using old reducer method , harder , no need to learn old , newer reducer toolkit is easy and powerful

export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    cat: "design",
    cover: "",
    images: [],
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: 0,
}

export const gigReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                // i dont know why we use [ ] for name: may be dynamically update name (from: stackOverflow)
                [action.payload.name]: action.payload.value,
            };



        case "ADD_IMAGES": 
            // IMP:for adding images
            return {
                ...state,
                cover: action.payload.cover,
                images: action.payload.images,
            };

        case "ADD_FEATURE":
            // VERY IMP: UNIQUE:LOOK CAREFULLY AND WHAT IT DOES ON ADD GIG PAGE
            return{
                ...state,
                // leaving previous feature as it is by ...state.feature and adding new bt action .payload
                features: [...state.features, action.payload],

            };
        
        case "REMOVE_FEATURE":
            // VERY IMP: LOOK at logic   
            return {
                ...state,
                features: state.features.filter(
                    // iterating each element
                    (feature)=>
                // feature will have each element except this filtered value. Or it will filter out the element with below value
                feature !== action.payload
                )
            };
        
        default:
            return state;
        
    }
}