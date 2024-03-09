import { useHttp } from "../hooks/http.hook"

const useShopService = () => {

   const { request, clearError, process, error, _api, _api2, _getIds, _getItems, _requestData } = useHttp();

   const filterItems = async (body) => {
      const res = await request(_api2, JSON.stringify(body));
   }

   const field = {
      "action": "get_fields",
      "params": {}
   }

   const getField = async () => {
      const res = await request(_api2, JSON.stringify(field));
   }



   return {
      filterItems,
      getField
   }
}

export default useShopService;