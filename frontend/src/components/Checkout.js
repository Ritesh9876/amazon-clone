import React from 'react'
import styled from 'styled-components'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal'
function Checkout() {
    const[{basket},dispatch]=useStateValue();
    return (
        <CheckoutPage>
            <CheckoutLeft>
        {
          basket?.length===0 ? (
         <div>
             <h2>You have no items in your basket.To buy one click on "Add to basket" next to the item.
             </h2>
         </div>
          ):(
              <CheckoutContainer>
                  <h2>Your shopping Basket</h2>
                  {basket.map((item,index)=>{
                      return (
                      <CheckoutProduct
                      key={parseInt(item.id) + index}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      />
                  )})}
              </CheckoutContainer>
          )
        }
        </CheckoutLeft>
        {basket.length>0 && (
            <Subtotal/>
        ) }
        </CheckoutPage>
    )
}
const CheckoutPage=styled.div`
display:flex;
padding:20px;
background-color:white;
height:max-content;
`;
const CheckoutContainer=styled.div`

h2{
    margin-right:10px;
    padding:10px;
    border-bottom:1px solid lightgrey;
}
`;
const CheckoutLeft=styled.div`
  
`;
export default Checkout
