import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
   name: 'loading',
   initialState: {
      loading: false
   },
   reducers: {
      setLoad: (state, action) => {
         return { ...state, loading: action.payload }
      }
   }
})

export const { setLoad } = loadingSlice.actions;

export const selectLoading = (state) => state.load.loading;

export default loadingSlice.reducer;