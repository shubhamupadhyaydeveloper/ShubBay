import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCartOpen: false,
    isMobile : false,
    mobile : false,
    cart: [],
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.items = action.payload
        },

        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item]
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(items => items.id !== action.payload.id)
        },

        increaseCount: (state, action) => {

          state.cart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                     item.count++;
                } 
                return item;
            })

        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item.id === action.payload.id && item.count > 1) {
                     item.count--;
                } 
                return item;
            })
        } ,

        setCartOpen : (state) => {
            state.isCartOpen = !state.isCartOpen;
        } ,

        setMoblie : (state) => {
            state.isMobile = !state.isMobile
        }
    }
})

export const {
  setItem,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setCartOpen,
  addToCart,
  setMoblie
} = cartSlice.actions

export const cartReducer = cartSlice.reducer;