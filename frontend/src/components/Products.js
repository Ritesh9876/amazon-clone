import React from 'react'
import styled from 'styled-components'
import StarRating  from './StarRating'
import { useStateValue } from './StateProvider'

function Products({id,title,price,rating,image}) {
    const [{},dispatch]=useStateValue();
  
    const addToBasket=()=>{
     dispatch({
         type:"ADD_TO_BASKET",
         item:{
             id,
             title,
             image,
            price,
            rating,
         }
     })
    }
    return (
        <ProductContainer>
            <ProductInfo>
                <ProdcutDetail>
         <p>{title}</p>
         <ProductPrice>
         <strong>$ {price} </strong>
         </ProductPrice> 
          <ProductRating>
         <StarRating rating={rating} id={id}/>
         </ProductRating>
         </ProdcutDetail>
         <ProductImage>
         <img src={image} alt=""/>
         </ProductImage>
         <Buttoncenter>
         <BasketButton onClick={addToBasket}>
             Add to basket
         </BasketButton>
         </Buttoncenter>
         </ProductInfo>
        </ProductContainer>
    )
}
const ProductContainer=styled.div`
height:400px;
min-width:100px;
width:100%;
max-height:600px; 
@media(max-width:680px){
    height:500px;
}
`;
const ProductInfo=styled.div`
height:100%;
background-color:white;
margin:10px;
padding-left:5px;
padding-top:16px;
z-index:1;
display:flex;
flex-direction:column;
align-items:flex-start ;
justify-content:space-between;

@media(max-width:680px){
padding-top:20px;
}
`;
const ProdcutDetail=styled.div`

`;
const ProductPrice=styled.div`

margin-top:5px;

`;
const ProductRating=styled.div`
`;
const ProductImage=styled.div`
margin-bottom:15px;
margin-top:5px;
background-color:white;
display:flex;
justify-content:center;
width:100%;
img{
    width:100%;
    max-height:200px;
    object-fit:contain;
}
`;
const Buttoncenter=styled.div`
display:flex;
justify-content:center;
width:100%;
`;
const BasketButton=styled.button`
background-color:#f0c14b;
outline:none;
border:1 solid ;
border-color:#a88734 #9c7e31 #B46a29;
margin-bottom:10px;
`;
export default Products
