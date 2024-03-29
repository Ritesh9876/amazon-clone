import React from 'react'
import styled from 'styled-components'
import {useStateValue} from './StateProvider'
import { useNavigate } from 'react-router-dom';
function Subtotal() {
    const history= useNavigate()
    const [{basket},dispatch]=useStateValue(); 
    return (
        <SubtotalContainer>
             <p>
                 Subtotal ({basket.length} items): <strong>{basket && basket.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.price
},0).toFixed(2)}</strong>
             </p>

          <ProceedButton>
              <button onClick={(e) => history("/payment")}>
            Proceed to Checkout
              </button>
          </ProceedButton>
        </SubtotalContainer>
    )
}
const SubtotalContainer=styled.div`

display:flex;
flex-direction:column;
justify-content:space-between;
width:300px;
height:100px;
background-color:#f3f3f3;
border:1px solid #dddddd;
border-radius:3px; 
`;
const SubtotalMain=styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
padding:20px;

`;
const ProceedButton=styled.div`
margin-bottom:20px;
button{
    background:#f0c14b;
    border-radius:2px;
    width:100%;
    height:30px;
    border:1px solid;
    margin-top:10px;
    border-color:#a88734 #9c7e31 #846a29;
    color:black;
}
`;
const SubtotalGift=styled.small`
display:flex; 
 align-items:center;
input{
    margin-right:5px;
}
`;
export default Subtotal
