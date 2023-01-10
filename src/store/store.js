import {configureStore} from '@reduxjs/toolkit'
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzaSlice";
import folderReducer from "./slices/folderSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
		pizza: pizzaReducer,
		folder: folderReducer,
	},
})