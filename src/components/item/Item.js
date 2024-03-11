
import './item.css'
const Item = (props) => {

   const { brand, id, price, product } = props.data;
   return (
      <div
         className={`item-block ${props.classes}`}
         >
         <ol>
            <li>{product}</li>
            <li>{price}</li>
            <li>{brand}</li>
            <li>{id}</li>
         </ol>
      </div>
   )
}

export default Item;