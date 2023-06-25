// REDUX TOOL KIT
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
    rendercom: true
};

export const globalSlice = createSlice({

    // property
    name:"global",
    initialState,

    // reducer are just function for changing global state
    reducers:{

       
        
        setRendercom:(state) => {
            state.rendercom = false
        },



    }
})

// below provide access of state and reducer in other file
export const { setRendercom } = globalSlice.actions;

export default globalSlice.reducer;
// while we import state in index.js in src, we have to import globalReducer as name of this slice is globalSlice