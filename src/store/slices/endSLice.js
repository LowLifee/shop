import { createSlice } from "@reduxjs/toolkit";

export const endSlice = createSlice({
   name: 'end',
   initialState: {
      filtered: false,
      end: false
   },
   reducers: {
      setEndData: (state, action) => {
         return { ...state, end: action.payload }
      },
      setFiltered: (state, action) => {
         return { ...state, filtered: action.payload }
      }
   }
})

export const { setEndData, setFiltered } = endSlice.actions;

export const selectEnd = (state) => state.end.end;
export const selectFiltered = (state) => state.end.filtered;

export default endSlice.reducer;