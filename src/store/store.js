import { configureStore } from "@reduxjs/toolkit";
import idsSlice from "./slices/idsSlice";
import loadingSlice from "./slices/loadingSlice";
import pagesSlice from "./slices/pagesSlice";

export const store = configureStore({
   reducer: {
      idLists: idsSlice,
      load: loadingSlice,
      page: pagesSlice
   }
})