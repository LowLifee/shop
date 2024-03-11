import { configureStore } from "@reduxjs/toolkit";
import idsSlice from "./slices/idsSlice";
import loadingSlice from "./slices/loadingSlice";
import pagesSlice from "./slices/pagesSlice";
import errorSlice from "./slices/errorSlice";
import endSLice from "./slices/endSLice";

export const store = configureStore({
   reducer: {
      idLists: idsSlice,
      load: loadingSlice,
      page: pagesSlice,
      error: errorSlice,
      end: endSLice
   }
})