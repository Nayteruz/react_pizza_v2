import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzaSlice";
import folderReducer from "./slices/folderSlice";

const rootReducer = combineReducers({
	filter: filterReducer,
	cart: cartReducer,
	pizza: pizzaReducer,
	folder: folderReducer,
});

export const store = configureStore({
	reducer: rootReducer,

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch