import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const url = 'https://course-api.com/react-useReducer-cart-project'


const initialState = {
  cartItems: [],
  amount: 10,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url).then((res) => res.json()).catch((err) => console.log(err))
})


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increaseAmount: (state, { payload }) => {
      const CartItem = state.cartItems.find((item) => item.id === payload.id)
      CartItem.amount = CartItem.amount + 1;
    },
    decreaseAmount: (state, { payload }) => {
      const CartItem = state.cartItems.find((item) => item.id === payload.id)
      CartItem.amount = CartItem.amount - 1;
    },
    totalAmount: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      })
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers:{
  [getCartItems.pending]:(state) => {
    state.isLoading = true;
  },
  [getCartItems.fulfilled]:(state,action) => {
    state.isLoading = false;
    state.cartItems = action.payload;
  },
  [getCartItems.rejected]:(state) => {
    state.isLoading = false;
  }
}})


export default cartSlice.reducer
export const { clearCart, removeItem, decreaseAmount, increaseAmount, totalAmount } = cartSlice.actions;