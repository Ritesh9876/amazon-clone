import React from 'react'
import styled from 'styled-components'
import Products from './Products'
function Home() {
    return (
        <HomePage>
            <Home_banner>
         <img  src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg" alt="banner"/>
            </Home_banner>
<HomeRow>
<Products id={12345} title="Laura Ashley Home - Charlotte Collection - Luxury Ultra Soft Comforter, All Season Premium Bedding Set, Stylish Delicate Design for Home Décor, King, China Blue"
           price={289.57} rating={5} image="https://m.media-amazon.com/images/I/A1kFVCaVUOL._AC_UL480_FMwebp_QL65_.jpg" />

<Products id={12345} title="Cozy Line Home Fashions Pink Green Pastel Polka Dot Flower 100% Cotton Reversible 6-Piece Quilt Bedding Set (Full/Queen- 6 Piece)"
           price={144.89} rating={5} image="https://m.media-amazon.com/images/I/716JCnJU1ZL._AC_UL480_FMwebp_QL65_.jpg" />

</HomeRow>

<HomeRow>
<Products id={12345} title="Sony A8H 65-inch TV: BRAVIA OLED 4K Ultra HD Smart TV with HDR and Alexa Compatibility - 2020 Model"
           price={300} rating={5} image="https://m.media-amazon.com/images/I/61F0MXKMLwL._AC_UL480_FMwebp_QL65_.jpg" />

<Products id={12345} title="Call Of Duty: Advanced Warfare (Xbox One)"
           price={26.90} rating={4} image="https://m.media-amazon.com/images/I/81dWbLERrNL._AC_UY327_FMwebp_QL65_.jpg" />

<Products id={12345} title="Razer Blade 15 Base Gaming Laptop 2020: Intel Core i7-10750H 6-Core, NVIDIA GeForce GTX 1660 Ti, 15.6 FHD 1080p 120Hz, 16GB RAM, 256GB SSD"
           price={1200.99} rating={5} image="https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UL480_FMwebp_QL65_.jpg" />

</HomeRow>

<HomeRow>

<Products id={12345} title="SAMSUNG 50-Inch Class Crystal UHD AU8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN50AU8000FXZA, 2021 Model)"
           price={239.99} rating={4} image="https://m.media-amazon.com/images/I/71LJJrKbezL._AC_UL480_FMwebp_QL65_.jpg" />

</HomeRow>
           
        </HomePage>
    )
}
const HomePage=styled.div`
max-width:1500px; 
    margin-left:auto;
    margin-right:auto;
`;
const Home_banner=styled.div`
z-index=-1;
margin-bottom:-150px;
@media(max-width:682px){
    margin-bottom:-90px;
}
img{
    width:100%;
    mask-image:linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,0));
   
}
`;
const HomeRow=styled.div`
margin: 0 5px;
margin-bottom:20px;
display:flex;
justify-content:space-around;
z-index:1;
`;
export default Home
