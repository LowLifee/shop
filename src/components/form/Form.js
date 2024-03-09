import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoad } from '../../store/slices/loadingSlice';
import { setItems } from '../../store/slices/idsSlice';

import './form.css';

function FormComponent(props) {

   const [name, setName] = useState('');
   const [price, setPrice] = useState(0);
   const [brand, setBrand] = useState(false);


   const dispatch = useDispatch();

   const toogleLoad = useCallback((e) => {
      e.preventDefault();
      dispatch(setLoad(true));
   }, []);

   const onSubmit = useCallback((e) => {
      e.preventDefault();
      const productCharactheristic = {
         brand: brand,
         price: price,
         product: name
      }

      setPrice(0);
      setName('');
      setBrand(false)

      console.log(productCharactheristic)
   }, [name])

   const onChange = useCallback((e, state) => {
      state(e.target.value);
      console.log(name, price, brand)
   }, [name, price])

   const onChecked = () => {
      const target = document.querySelector('#brand-checkbox');

      setBrand(brand => target.checked);
      console.log(name, price, brand)
   }


   return (
      <Form className={`${props.classes}`}
         onSubmit={(e) => onSubmit(e)}>
         <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text"
               placeholder="Write name of the product."
               value={name}
               onChange={(e) => onChange(e, setName)} />
            <Form.Text className="text-muted">
            </Form.Text>
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number"
               placeholder="Write the price you prefer."
               value={price}
               onChange={(e) => onChange(e, setPrice)} />
            <Form.Text className="text-muted">
            </Form.Text>
         </Form.Group>
         <Form.Group className="mb-3"
            controlId="formBasicCheckbox">
            <Form.Check
               type="checkbox"
               label="Brand"
               id='brand-checkbox'
               onClick={onChecked}
            />
         </Form.Group>
         <Button variant="secondary"
            type="submit">
            Go filter
         </Button>
      </Form>
   );
}

export default FormComponent;