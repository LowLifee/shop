import { useCallback, useState } from 'react';
import Item from '../item/Item';
import { v4 as uuidv4 } from 'uuid';

import './itemList.css';


const ItemList = (props) => {
   const [data, setData] = useState(props.data)

   const renderItems = useCallback((data) => {

      const elements = data.map(item => {
         const id = uuidv4();
         return (
            <Item key={id} />
         )
      })
      return (
         <div className="item-lists">
            {elements}
         </div>
      )
   }, [data])

   const list = renderItems(props.data);

   return (
      <div className="item-list-wrapper">
         {list}
      </div>
   )

}

export default ItemList;