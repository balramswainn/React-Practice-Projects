import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        //actions
        setCart: (state, action) => {
            state.cart = action.payload;
            //  state.cart.push(action.payload);    //ye mene bas ese hi try kiya uper pura array re assign ho raha tha toh yaha me pura array nhi bas object le raha hoon [{},{}]
        }
    }
});

export const { setCart } = cartSlice.actions
export default cartSlice.reducer




