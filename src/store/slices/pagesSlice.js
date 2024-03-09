import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
   name: 'pages',
   initialState: {
      page: 1
   },
   reducers: {
      setPages: (state, action) => {
         return { ...state, page: action.payload }
      }
   }
})

export const { setPages } = pageSlice.actions;

export const selectPages = (state) => state.page.page;

export default pageSlice.reducer;