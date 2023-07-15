

export const initialState = {
    basket: [{
        id: 12345, title: "Laura Ashley Home - Charlotte Collection - Luxury Ultra Soft Comforter, All Season Premium Bedding Set, Stylish Delicate Design for Home Décor, King, China Blue"
        , price: 289.57, rating: 5, image: "https://m.media-amazon.com/images/I/A1kFVCaVUOL._AC_UL480_FMwebp_QL65_.jpg"
    }],
    user: null,
};
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case "REMOVE_FROM_BASKET":
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

            if (index >= 0) {
                newBasket.splice(index, 1);

            } else {
                console.warn(
                    `Cant remove product (id:${action.id}) as its not positive`
                );
            }

            return { ...state, basket: newBasket }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;
