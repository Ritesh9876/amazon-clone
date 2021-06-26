import React from 'react'
import styled from 'styled-components'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
function Checkout() {
    const[{basket},dispatch]=useStateValue();
    return (
        <CheckoutPage>
        {
          basket?.length===0 ? (
         <div>
             <h2>You have no items in your basket.To buy one click on "Add to basket" next to the item.
             </h2>
         </div>
          ):(
              <CheckoutContainer>
                  <h2>Your shopping Basket</h2>
                  {basket.map((item,index)=>(
                      <CheckoutProduct
                      key={item.id + index}
                      item={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      />
                  ))}
              </CheckoutContainer>
          )

          

        }
        </CheckoutPage>
    )
}
const CheckoutPage=styled.div`

`;
const CheckoutContainer=styled.div``;
export default Checkout
