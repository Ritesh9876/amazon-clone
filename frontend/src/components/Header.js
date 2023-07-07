import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from './Firebase/firebase'
function Header() {
const [{basket,user},dispatch]=useStateValue()
const handleAuthentication = ()=>{
    if(user){
        auth.signOut()
    }
}
    return (
        <Nav>
            <Link to="/">
            <HeaderLogo>
            <img alt ="logo" src="https://www.gizmochina.com/wp-content/uploads/2020/05/Amazon-Logo-Dark.jpg"/>
            </HeaderLogo>
            </Link>
             <Header_searchInput>
                 <input type="text" />
                 <IconSearch>
                 </IconSearch>
             </Header_searchInput>
             <HeaderNav>
               <Link to={!user && "/login"}>
               <Header_option onClick={handleAuthentication}>
                <SpanOne>
               <span>{user? user.email :"Guest"}</span>
               </SpanOne>
               <SpanTwo>
               <span>{user ? "Sign out":"Sign in"}</span>
               </SpanTwo>
               </Header_option>
               </Link>

               <Link to="/login">
               <Header_option>
               <SpanOne>
               <span>Returns</span>
               </SpanOne>
               <SpanTwo>
               <span>& Orders</span>
               </SpanTwo>
               </Header_option>
               </Link>

               <Link to="/login">
               <Header_option>
               <SpanOne>
               <span>Your</span>
               </SpanOne>
               <SpanTwo>
               <span>Prime</span>
               </SpanTwo>
               </Header_option>
               </Link>
             </HeaderNav>

             <Link to="/checkout">
               <HeaderBasket>
                   <NoOfItems>
                   <span>{basket?.length}</span>
                   </NoOfItems>
               </HeaderBasket>
             </Link>
        </Nav> 
    )
}
const Nav=styled.div`
height:70px;
background-color:#2E292B;
position:sticky;
top:0;
z-index:1000;
display:flex; 
align-items:center;
a{
    color:white;
    text-decoration:none;
}
`;
const HeaderLogo=styled.div`
img{
    object-fit:contain;
    height:100%;
    width:100px;
    margin:auto 20px;
    pointer:cursor;
}
`;
const Header_searchInput=styled.div`
height:30px;
flex:1;
display:flex;
align-items:center;

input{
    height:100%;
padding:5px;
outline:none;
border:none;
flex:1;
}
`;
const IconSearch=styled.div`
padding:5px 8px;
background-color:#F3A847;
border-radius:2px;
height:100%;
display:flex;
align-items:center;

`;

const HeaderNav=styled.div`
display:flex;
justify-content:space-content;
a{
    color:white;
    text-decoration:none;
}
`;
const Header_option=styled.div`
 margin:0 10px;
display:flex;
flex-direction:column; 


`;
const SpanOne=styled.div`
font-size:10px;
font-weight:400;
`;
const SpanTwo=styled.div`
font-size:13px;
font-weight:700;

`;

const HeaderBasket=styled.div`
display:flex;
align-items:center;
`;

const NoOfItems=styled.div`
span{
    margin:0px 10px;
}
`;
export default Header
