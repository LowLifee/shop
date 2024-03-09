import img from '../../resources/img/photo_2024-03-08_23-51-30.jpg'
import './item.css'
const Item = (props) => {

   return (
      <div className={`item-block ${props.classes}`}>
         <img
            src={img}
            alt="#"
            className='item-img' />
         <ol>
            <li>item name</li>
            <li>item price</li>
            <li>brand</li>
            <li>item description</li>
         </ol>
      </div>
   )
}

export default Item;