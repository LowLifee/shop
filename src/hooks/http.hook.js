import { useCallback, useState } from "react";
import md5 from "md5";
import { useSelector, useDispatch } from 'react-redux';
import { setLoad } from "../store/slices/loadingSlice";
import { selectError, setError } from "../store/slices/errorSlice";


export const useHttp = () => {

   const [loading3we, setLoading] = useState(null);
   const _api = 'http://api.valantis.store:40000/';
   const _api2 = 'https://api.valantis.store:41000/';

   const password = 'Valantis';
   const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
   const authString = `${password}_${timestamp}`;
   const XAuth = md5(authString);

   const dispatch = useDispatch();

   const error = useSelector(selectError);


   const _getIds = {
      "action": "get_ids",
      "params": { "offset": 0, "limit": 50 }
   };

   const request = async (url = _api, method = 'POST', body = JSON.stringify(_getIds), headers = { 'Content-type': 'application/json', 'X-Auth': XAuth }) => {
      dispatch(setLoad(true));
      setLoading(true);
      try {
         const response = await fetch(url, { method, body, headers });

         if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
         }
         dispatch(setLoad(false));
         const data = await response.json();

         return data;
      } catch (e) {
         dispatch(setLoad(false));
         dispatch(setError(true));
         console.log(e);
         throw e
      }
   }

   const clearError = useCallback(() => {
      dispatch(setLoad(false));
      dispatch(setError(false));
   }, [])
   return {
      request,
      clearError,
      _api,
   }
};







