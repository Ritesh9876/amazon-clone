import React from 'react'
import styled from 'styled-components'
import StarRating from './StarRating'
import {useStateValue} from './StateProvider'

function CheckoutProduct({id,title,image,rating,price}) {
const [{basket},dispatch]=useStateValue();
   
const RemoveFromBasket=()=>{
     dispatch({
         type:"REMOVE_FROM_BASKET",
         id:id,
     })
   }

    return (
        <div>
            <Checkoutitem>
            <CheckoutitemImg>
                <img src={image} alt=""/>
            </CheckoutitemImg>

            <CheckoutitemInfo>
            <p>{title}</p>
           <Price>
               <small>$</small>
               <strong>{price}</strong>
           </Price>
           <StarRating rating={rating} id={id}/>
           <RemoveItem onClick={RemoveFromBasket}>
               Remove from basket
           </RemoveItem>
            </CheckoutitemInfo>
            </Checkoutitem>
        </div>
    )
}
const Checkoutitem=styled.div`
margin-top:20px;
display:flex;
margin-bottom:20px;
`;
const CheckoutitemImg=styled.div`
width:200px;
height:180px;
@media(max-width:830px){
    width:300px; 
}
img{
    object-fit:contain;
  height:100%;
  width:100%;
}
`;
const CheckoutitemInfo=styled.div`
padding-left:20px;
margin-top:25px;
p{
    font-size:16px;
    font-weight:800;
}
`;
const Price=styled.div`

`;
const RemoveItem=styled.button`
background:#f0c14b;
border:1px solid;
border-color:#a88734 #9c7e31 #846a29;
color:black;
`;
export default CheckoutProduct
