import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISortItem, OrderType, SortPropertyType } from "../../@types/shared_types";

interface IInit {
	searchValue: string,
	categoryId: number,
	sort: ISortItem,
	listSort: ISortItem[],
	page: number,
	limit: number,
	folders: {name: string, id: number}[],
}

const initialState: IInit = {
	searchValue: '',
	categoryId: 0,
	sort: {id: 2, name: '🠗 популярности', sortProperty: SortPropertyType.RATING, order: OrderType.DESC},
	listSort: [
		{id: 1, name: '🠕 популярности', sortProperty: SortPropertyType.RATING, order: OrderType.ASC},
		{id: 2, name: '🠗 популярности', sortProperty: SortPropertyType.RATING, order: OrderType.DESC},
		{id: 3, name: '🠕 цене', sortProperty: SortPropertyType.PRICE, order: OrderType.ASC},
		{id: 4, name: '🠗 цене', sortProperty: SortPropertyType.PRICE, order: OrderType.DESC},
		{id: 5, name: '🠕 алфавиту', sortProperty: SortPropertyType.TITLE, order: OrderType.ASC},
		{id: 6, name: '🠗 алфавиту', sortProperty: SortPropertyType.TITLE, order: OrderType.DESC},
	],
	page: 1,
	limit: 4,
	folders: [],
}

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.page = 1;
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>){
			state.searchValue = action.payload;
		},
		setSort(state, action) {
			state.page = 1;
			state.sort = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
		setFields(state, action: PayloadAction<{page: number, sort: ISortItem, categoryId: number}>) {
			state.page = Number(action.payload.page);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
		},
		setFieldsDefault(state) {
			state.page = 1;
			state.sort = state.listSort[0];
			state.categoryId = 0;
		}
	}
})

export const selectorFilter = (state: RootState) => state.filter;

export const {setCategoryId, setSort, setPage, setFields, setFieldsDefault, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;