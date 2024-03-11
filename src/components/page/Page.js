import { useCallback, useState, useEffect } from 'react';
import LoadingSpinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './page.css';

import { selectError } from '../../store/slices/errorSlice';
import { selectLoading, setLoad } from '../../store/slices/loadingSlice';
import { selectItems, setItems } from '../../store/slices/idsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectEnd, setEndData, selectFiltered } from '../../store/slices/endSLice';
import { useHttp } from '../../hooks/http.hook';
import Item from '../item/Item';

const Page = (props) => {
   const [products, setProducts] = useState([]);
   const [page, setPage] = useState(1);
   const [endPage, setEnd] = useState(false);
   const [startPage, setStart] = useState(true);
   const [offset, setOffset] = useState(0);
   const [limit, setLimit] = useState(50);

   const items = useSelector(selectItems);

   const loading = useSelector(selectLoading);
   const error = useSelector(selectError);
   const endedPage = useSelector(selectEnd);
   const filtered = useSelector(selectFiltered);

   const dispatch = useDispatch();
   const { request, _api, clearError } = useHttp();

   const _getIds = {
      "action": "get_ids",
      "params": { "offset": offset, "limit": limit }
   };

   const _getItems = {
      "action": "get_items",
      "params": {
         "ids": items
      }
   }


   const makeUniq = (arr) => {
      return arr.filter((item, index, self) => {
         return index === self.findIndex((t) => (
            t.id === item.id && t.name === item.name
         ));
      });
   }

   const getIds = useCallback(async () => {
      clearError();
      await request(_api, "POST", JSON.stringify(_getIds))
         .then(res => {
            setProducts([]);
            dispatch(setItems([]));
            dispatch(setItems(res.result));
         })
   }, [items]);

   useEffect(() => {
      getIds();
   }, [page]);


   const getIemsByid = useCallback(() => {
      clearError();
      request(_api, "POST", JSON.stringify(_getItems)).then(res => {
         const filteredIds = makeUniq(res.result);
         if (filtered) {
            setProducts(filteredIds);
         } else {
            if (filteredIds.length < 50 && filteredIds.length > 0 && limit < 55) {
               setLimit(50 + (50 - filteredIds.length));
               getIds();
            } else {
               if (filteredIds.length > 0 ?? filteredIds.length === 50) {
                  setProducts(filteredIds);
                  setOffset(prevOffset => prevOffset + (limit - 50));
                  setLimit(50);
               }
            }
         }
      });
   }, [items, limit, endedPage]);

   useEffect(() => {
      getIemsByid();
   }, [items])


   const onNext = useCallback(() => {
      window.scrollTo({
         top: -1000,
         behavior: "smooth"
      });

      setPage(page => page + 1);
      setOffset(offset => offset + 50)
      setStart(false);
   }, [page, offset, startPage, endPage])

   const onPrev = useCallback(() => {
      window.scrollTo({
         top: -1000,
         behavior: "smooth"
      });

      setPage(page => page - 1);
      setOffset(offset => offset - 50)
      setEnd(false);
   }, [page, offset, startPage, endPage]);

   useEffect(() => {

      if (page === 1) {
         setStart(true);
      }
      if (products.length < 50 || items.length < 50) {
         setEnd(true);
      } else {
         setEnd(false);
      }
   }, [page, products]);

   useEffect(() => {
      if (filtered) {
         dispatch(setEndData(true));
      }
   }, [filtered])

   const renderItems = (products) => {
      clearError();
      const elem = products.map(item => {
         return (
            <Item data={item}
               key={item.id}
            />
         )
      })
      return (
         <div className="item-lists">
            {elem}
         </div>
      )
   }

   const emtpyPage = products.length === 0 && !error && !loading ? <h2 id='empty-page'>No products...</h2> : null;
   const elements = !loading && products.length > 0 ? renderItems(products) : null;
   const spinner = !error && loading ? <LoadingSpinner /> : null;
   const erroMe = !loading && error ? <ErrorMessage /> : null;

   return (
      <div className="page">
         <div className="page-wrapper">
            <div
               className="page-view"
            >
               <div className="item-list-wrapper">
                  {emtpyPage}
                  {erroMe}
                  {spinner}
                  {elements}
               </div>
            </div>
         </div>

         <div className="page-btns">
            <button
               id='prev'
               onClick={onPrev}
               disabled={startPage}>Prev</button>
            <span id='page-number'>{page}</span>
            <button
               id='next'
               onClick={onNext}
               disabled={endPage}>Next</button>
         </div>

      </div>
   )
}

export default Page;