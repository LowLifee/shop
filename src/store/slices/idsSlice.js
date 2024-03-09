import { createSlice } from "@reduxjs/toolkit";

export const idsSlice = createSlice({
   name: 'ids',
   initialState: {
      items: []
   },
   reducers: {
      setItems: (state, action) => {
         return { ...state, items: [...action.payload] }
      }
   }
})

export const { setItems } = idsSlice.actions;

export const selectItems = (state) => state.idLists.items;

export default idsSlice.reducer;