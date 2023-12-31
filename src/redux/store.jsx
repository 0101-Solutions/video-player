import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from './features/auth/authSlice';
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch);