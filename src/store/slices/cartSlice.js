import {createSlice} from '@reduxjs/toolkit'
import uuid from 'react-uuid';
import isEqualProduct from "../../utils/isEqualProduct";

const initialState = {
	items: [],
	totalPrice: 0,
	totalCount: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			let item = state.items.find(i => isEqualProduct(i, action.payload))
			if (item) {
				item.count = item.count + 1;
			} else {
				state.items.push({...action.payload, id: uuid()})
			}
			cartSlice.caseReducers.countTotals(state);
		},
		plusItemCount(state, action){
			const item = state.items.find(i => i.id === action.payload.id)
			if (item){
				item.count += 1;
			}

			cartSlice.caseReducers.countTotals(state);
		},
		minusItemCount(state, action){
			const item = state.items.find(i => i.id === action.payload.id)
			if (item){
				item.count -= 1;

				if (item.count <= 0){
					cartSlice.caseReducers.removeItem(state, {payload: {id: item.id}});
				}
			}

			cartSlice.caseReducers.countTotals(state);
		},
		removeItem(state, action) {
			state.items = state.items.filter(i => i.id !== action.payload.id);
			cartSlice.caseReducers.countTotals(state);
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
				state.totalCount += item.count;
				state.totalPrice += item.count * item.price;
				return true;
			})
		}
	}
})

export const {addItem, removeItem, clearItems, plusItemCount, minusItemCount} = cartSlice.actions;

export default cartSlice.reducer;