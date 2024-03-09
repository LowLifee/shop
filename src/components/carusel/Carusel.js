import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

import './carusel.css';

const Carusel = (props) => {
   const [index, setIndex] = useState(0);
   const images = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf_C3OjH3BbicdZ1UP0jAncMv-HpNvU_B1fg6C8H_vcg&s';

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   return (
      <div className='flex'>
         <Carousel activeIndex={index} onSelect={handleSelect} >
            <Carousel.Item>
               <img src={images} alt="" />
               <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <img src={images} alt="" />
               <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
               </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>

               <Carousel.Caption>
                  <img src={images} alt="" />
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>

               <Carousel.Caption>
                  <img src={images} alt="" />
                  <h3>Third slide label</h3>
                  <p>
                     Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
               </Carousel.Caption>
            </Carousel.Item>
         </Carousel>
      </div>

   );
}

export default Carusel;