import { useCallback, useState, useEffect } from 'react';
import FormComponent from '../form/Form';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import LoadingSpinner from '../spinner/Spinner';
import { v4 as uuidv4 } from 'uuid';

import ItemList from '../itemList/ItemList';
import './page2.css';
import Item from '../item/Item';

import { selectItems } from '../../store/slices/idsSlice';
import { selectLoading } from '../../store/slices/loadingSlice';
import { useSelector, useDispatch } from 'react-redux';

const Page2 = (props) => {
   const [data, setData] = useState(props.data);
   const [filtered, setFiltered] = useState([]);
   const [page, setPage] = useState(1);
   const [offset, setOffset] = useState(0);
   const [loading, setLoading] = useState(false);
   const [endPage, setEnd] = useState(false);
   const [startPage, setStart] = useState(true);

   const test = useSelector(selectItems);
   const load = useSelector(selectLoading)

   const dispatch = useDispatch();


   const onNext = useCallback(() => {
      const width = document.querySelector('.page-container').clientWidth;
      window.scrollTo({
         top: -1000,
         behavior: "smooth"
      });
      if (page === filtered.length) {
         //setPage(1);
         //setOffset(0);
         //setEnd(true);
      } else {
         setPage(page => page + 1);
         setOffset(offset => offset + width);
         setStart(false);
      }
      onPaginationActive(page);
   }, [page])

   const onPrev = useCallback(() => {
      const width = document.querySelector('.page-container').clientWidth;
      window.scrollTo({
         top: -1000,
         behavior: "smooth"
      });

      if (page === 1) {
         //setPage(filtered.length);
         //setOffset(width * (filtered.length - 1));
         //setStart(true);
      } else {
         setPage(page => page - 1);
         setOffset(offset => offset - width);
         setEnd(false);
      }
      onPaginationActive(page);
   }, [page])

   const pagination = useCallback((filtered) => {
      const pages = filtered.map((item, i) => {
         const id = uuidv4();

         if (i === 0) {
            return (
               <button
                  key={id}
                  className='pagination-btns active-pagination'
                  data-value={i + 1}
                  onClick={() => onChangePage(i + 1)}
               >{i + 1}</button>
            )
         }

         return (
            <button
               key={id}
               className='pagination-btns'
               data-value={i + 1}
               onClick={() => onChangePage(i + 1)}
            >{i + 1}</button>
         )
      })

      return pages
   }, [page])

   const onPaginationActive = useCallback((page = 1) => {
      const btns = document.querySelectorAll(`.pagination-btns`);

      btns.forEach((item, i) => {
         item.classList.remove('active-pagination');
         if (i + 1 === page) {
            item.classList.add('active-pagination');
         }
      })
   }, [page])

   const toogleStartEnd = () => {
      page === filtered.length ? setEnd(true) : setEnd(false);
      page === 1 ? setStart(true) : setStart(false);
   }

   useEffect(() => {
      toogleStartEnd()
      //if (page === filtered.length) {
      //   setEnd(true);
      //} else {
      //   setEnd(false);
      //}

      //if (page === 1) {
      //   setStart(true);
      //} else {
      //   setStart(false);
      //}
      onPaginationActive(page);

   }, [page, endPage, startPage])

   const onChangePage = useCallback((num) => {
      window.scrollTo({
         top: -1000,
         behavior: "smooth"
      });

      const width = document.querySelector('.page-container').clientWidth;
      setPage(page => num)
      setOffset(width * (num - 1));
      onPaginationActive(page);
   }, [page])

   const itemDevider = useCallback((list) => {

      const pages = {};
      let counter = 1;
      let divider = 50;
      let newList = true;
      let empty = 0;

      list.forEach((element, i) => {

         if (newList) {
            newList = false;
            if (i === 0) {
               pages[i] = list.slice(i, (i + 50));
            } else {
               list.slice(i + 1, (i + 51)).length > 49 ? pages[i] = list.slice(i + 1, (i + 51)) : empty++;
            }
         }

         counter++;

         if (counter === divider) {
            divider += 50;
            newList = true;
         }
      });

      if (list.length % 50 && list.length > 50) {
         pages[counter] = list.slice(-(list.length % 50))
      }

      return pages
   }, [data])


   const sorting = useCallback(() => {
      const test = itemDevider(data);
      const sorted = [];
      let counter = 0;

      for (let key in test) {
         sorted[counter] = test[key];
         counter++;
      }
      setFiltered(sorted);
   }, [data]);

   useEffect(() => {
      sorting();
   }, [data])


   const makePage = useCallback((data) => {
      const item = data.map(item => {
         const id = uuidv4();
         return (
            <ItemList data={item} key={id} />
         )
      });

      return (
         <>
            {item}
         </>
      )
   }, [data]);

   const element = !load ? makePage(filtered) : null;
   const spinner = load && data.lenght === 0 ? <LoadingSpinner /> : null;

   return (
      <div className="page">
         <ErrorBoundary>
            <div className="page-container">
               <div
                  className="page-view"
                  style={{ 'transform': `translateX(-${offset}px)` }}
               >
                  {spinner}
                  {element}
               </div>
            </div>
         </ErrorBoundary>
         <div className="page-btns">
            <button
               id='prev'
               onClick={onPrev}
               disabled={startPage}>Prev</button>
            {pagination(filtered)}
            <button
               id='next'
               onClick={onNext}
               disabled={endPage}>Next</button>
            <span id='page-number'>{`${page} / ${filtered.length}`}</span>
         </div>
         <div className='view-item'>
            <Item classes={'selected'} />
         </div>
         <div className="filter">
            <FormComponent classes={'filter-form'} />
         </div>
      </div>
   )
}

export default Page2;