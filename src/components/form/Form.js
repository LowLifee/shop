import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { selectItems, setItems } from '../../store/slices/idsSlice';
import { setFiltered, selectFiltered } from '../../store/slices/endSLice';

import './form.css';

function FormComponent(props) {

   const [selector, setSelector] = useState(null);
   const [value, setValue] = useState('');
   const [disabled, setDisabled] = useState(true);

   const productName = 'product',
      price = 'price',
      brand = 'brand',
      sortBy = 'Sort by...';

   const items = useSelector(selectItems);
   const filtered = useSelector(selectFiltered);

   const { request, _api } = useHttp()

   const dispatch = useDispatch();

   const onSubmit = useCallback(async (e) => {
      e.preventDefault();

      const key = selector;
      const productCharactheristic = {
         action: 'filter',
         params: { [key]: key === 'price' ? +value : value }
      }

      if (selector === sortBy) {
         return dispatch(setFiltered(false))
      } else {

         productCharactheristic.params[key] = key === 'price' ? +value : value;

         await request(_api, "POST", JSON.stringify(productCharactheristic)).then(res => dispatch(setItems(res.result)));
         setDisabled(true)
         dispatch(setFiltered(true));
      }
   }, [productName, price, value, selector, items, brand])

   const onSelect = useCallback((e) => {
      setSelector(e.target.value);
   }, [selector, sortBy]);

   const onChange = useCallback((e) => {
      setDisabled(false);
      console.log(disabled)
      setValue(e.target.value);
   }, [productName, price, value, brand, sortBy, disabled])

   const classes = selector ? 'active-form' : 'non-active';
   const placeholder = selector === 'product' ? 'name' : selector;

   return (
      <Form className={`${props.classes}`}
         onSubmit={(e) => onSubmit(e)}>

         <Form.Select
            aria-label="Default select example"
            className='form-inputs'
            onChange={onSelect}>
            <option value={sortBy}>Sort by...</option>
            <option value={productName}>name</option>
            <option value={brand}>brand</option>
            <option value={price}>price</option>
         </Form.Select>

         <Form.Group
            className={`mb-3 form-inputs ${classes}`}
            controlId="formBasicText">
            <Form.Control type="text"
               placeholder={`Write ${placeholder} of the product`}
               value={value}
               onChange={onChange}
               required />
            <Form.Text className="text-muted">
            </Form.Text>
         </Form.Group>

         <Button variant="secondary"
            type="submit"
            disabled={disabled}>
            Go filter
         </Button>
      </Form >
   );
}

export default FormComponent;
