import React from 'react'
import styled from 'styled-components'
import {FaStar} from 'react-icons/fa'
function StarRating({rating,id}) {
    return (
        <Stars>
          {
              Array(rating).fill().map((star,index)=>{
                return <Star key={id+index}></Star> 
              })
          } 
        </Stars>
    )
}
const Stars=styled.div`
display:flex;
p{
}

`;
 const Star=styled(FaStar)`
 color:yellow;
 `;


export default StarRating
