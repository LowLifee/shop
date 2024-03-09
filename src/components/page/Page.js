import { useState, useCallback, useEffect } from 'react';
import Item from '../item/Item';
import FormComponent from '../form/Form';
import './page.css';
import Button from 'react-bootstrap/Button';

const Page = (props) => {

   const [imgPage, setImgPage] = useState(1);
   const [offset, setOffset] = useState(0);
   const [data, setData] = useState(props.data);
   const [value, setValue] = useState('');



   const nextPage = useCallback((num = 1) => {
      if (imgPage === Math.round(data.length / 8)) {
         setImgPage(1);
         setOffset(0);
      } else {
         setImgPage(imgPage => imgPage + num);
         setOffset(offset => +offset + 740);
      }
   }, [imgPage]);

   const prevPage = useCallback((num = 1) => {
      if (imgPage === 1) {
         setImgPage(Math.round(data.length / 8));
         setOffset((Math.round(data.length / 8) - 1) * 740);
      }
      else {
         setImgPage(imgPage => imgPage + num);
         setOffset(offset => +offset - 740);
      }
   }, [imgPage])

   const mouseEnter = (e) => {
      const target = e.target;
      target.classList.add('active-desctiption');
   }

   const mouseLeave = (e) => {
      const target = e.target;
      target.classList.remove('active-desctiption');
   }

   const onSubmitPage = useCallback((e, value) => {
      e.preventDefault();
      if (value <= Math.round(data.length / 8) && value) {
         setImgPage(+value);
         setOffset(imgPage * 740);
      }
   }, [])

   const onChangeValue = useCallback((e) => {
      setValue(+e.target.value)
   }, [])

   const renderItems = (data) => {

      const style = {
         'transform': `translateX(-${offset}px)`,
         'display': 'grid',
         'gridTemplateColumns': `repeat(${data.length / 2}, 1fr)`,
         'gridTemplateRows': `repeat(2, 1fr)`
      }

      const content = data.map((item, i) => {
         return (
            <Item />
         )
      })

      return (
         <div style={style} className='list-page'>
            {content}
         </div>
      )
   }

   let content = renderItems(data);

   return (
      <div className="page-wrapper">
         <div className="item-info">
            <Item />
         </div>
         {/*<form
            action=""
            id='filter-form'>
            <input type="text" id='price' />
            <input type="checkbox" id='brand' />
            <label htmlFor="brand">In brand</label>
            <button id='filter-btn'>Filter</button>
         </form>*/}
         <FormComponent />
         <div className="content">
            {content}
         </div>
         <div className="btns">
            <button
               id='prev-btn'
               onClick={() => prevPage(-1)}>Prev</button>
            <span>{imgPage} / {Math.round(data.length / 8)}</span>
            <form action=""
               onSubmit={(e) => onSubmitPage(e, value)}>
               <input
                  type="number"
                  value={value}
                  onChange={(e) => onChangeValue(e)} />
               <button>перейти</button>
            </form>

            <Button
               variant="secondary"
               id='next-btn'
               onClick={() => nextPage(1)}>Next</Button>
         </div>
      </div>
   )
}

export default Page;
