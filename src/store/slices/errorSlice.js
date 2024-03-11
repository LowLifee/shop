import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
   name: 'error',
   initialState: {
      error: false
   },
   reducers: {
      setError: (state, action) => {
         return { ...state, error: action.payload }
      }
   }
})

export const { setError } = errorSlice.actions;

export const selectError = (state) => state.error.error;

export default errorSlice.reducer;