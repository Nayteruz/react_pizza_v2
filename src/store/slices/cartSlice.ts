import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from 'react-uuid';
import isEqualProduct from "../../utils/isEqualProduct";
import { RootState } from "../store";
import { ICartProduct } from "../../@types/shared_types";


interface IInit {
	items: ICartProduct[];
	totalPrice: number;
	totalCount: number;
}

const initialState: IInit = {
	items: [],
	totalPrice: 0,
	totalCount: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<ICartProduct>) {
			let item = state.items.find(i => isEqualProduct(i, action.payload))
			if (item) {
				item.count! += 1;
			} else {
				state.items.push({...action.payload, id: uuid()})
			}
		},
		plusItemCount(state, action: PayloadAction<{id: string}>){
			const item = state.items.find(i => i.id === action.payload.id)
			if (item){
				item.count! += 1;
			}
		},
		minusItemCount(state, action: PayloadAction<{id: string}>){
			const item: ICartProduct | undefined = state.items.find(i => i.id === action.payload.id)
			if (item){
				item.count! -= 1;
				if (item.count! <= 0){
					cartSlice.caseReducers.removeItem(state, action);
				}
			}
		},
		removeItem(state, action: PayloadAction<{id: string}>) {
			state.items = state.items.filter(i => i.id !== action.payload.id);
		},
		clearItems(state) {
			state.totalCount = 0;
			state.totalPrice = 0;
			state.items = [];
		},
		countTotals(state){
			state.totalCount = 0;
			state.totalPrice = 0;
			state.items.map(item => {
				state.totalCount += item.count!;
				state.totalPrice += item.count! * item.price;
				return true;
			})
		}
	}
})

export const cartSelector = (state: RootState) => state.cart;

export const selectorCartItem = (sortData: { size: number; price: number; imageUrl: string; count: number; id: string | undefined; title: string; type: string }) => (state: RootState) => state.cart.items.filter(i => isEqualProduct(sortData, i))

export const {addItem, countTotals, removeItem, clearItems, plusItemCount, minusItemCount} = cartSlice.actions;

export default cartSlice.reducer;