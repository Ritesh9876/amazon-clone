

 export const initialState={
     basket:[{
        id:12345, title:"Laura Ashley Home - Charlotte Collection - Luxury Ultra Soft Comforter, All Season Premium Bedding Set, Stylish Delicate Design for Home Décor, King, China Blue"
        ,price:289.57, rating:5 ,image:"https://m.media-amazon.com/images/I/A1kFVCaVUOL._AC_UL480_FMwebp_QL65_.jpg"
     }],
 };
  
const reducer=(state,action)=>{
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
        return {
            ...state,
        basket:[...state.basket,action.item]
        };
        break;
        case "REMOVE_FROM_BASKET":
        return {state};
        break;
        default:
            return state; 
    }
}

export default reducer;
