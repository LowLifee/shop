import { useCallback, useState } from "react";
import md5 from "md5";

export const useHttp = () => {

   const [process, setProcess] = useState(null);
   const [error, setError] = useState(false);
   const _api = 'http://api.valantis.store:40000/';
   const _api2 = 'https://api.valantis.store:41000/';

   const password = 'Valantis';
   const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
   const authString = `${password}_${timestamp}`;
   const XAuth = md5(authString);

   const _requestData = {
      "action": "filter",
      "params": { "price": 17500.0 }
   };

   const _getIds = {
      "action": "get_ids",
      "params": { "offset": 1, "limit": 50 }
   };

   const _getItems = {
      "action": "get_items",
      "params": { "ids": ["1789ecf3-f81c-4f49-ada2-83804dcc74b0"] }
   }


   const field = {
      "action": "get_fields",
      "params": { "field": "brand", "offset": 3, "limit": 5 }
   }

// ради теста пробовал поставить в тело константы сверху

   const request = async (url = _api, method = 'POST', body = JSON.stringify(_getIds), headers = { 'Content-type': 'application/json', 'X-Auth': XAuth }) => {

      setProcess(true);
      try {
         const response = await fetch(url, { method, body, headers });

         if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`) // в консоле ошибку с статусом 500
         }

         setProcess(false);
         setError(false)
         const data = await response.json();

         return data;
      } catch (e) {
         setError(true)
         console.log(e);
         throw e
      }
   }

   const clearError = useCallback(() => {
      setProcess(false);
      setError(false);
   }, [])
   return {
      request,
      clearError,
      process,
      error,
      _api,
      _api2,
      _getIds,
      _getItems,
      _requestData   //не обращать внимание на retutn

   }
};







