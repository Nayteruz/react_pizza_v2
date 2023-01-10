import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	searchValue: '',
	categoryId: 0,
	sort: {id: 2, name: '🠗 популярности ', sortProperty: 'rating', order: 'desc'},
	listSort: [
		{id: 1, name: '🠕 популярности ', sortProperty: 'rating', order: 'asc'},
		{id: 2, name: '🠗 популярности ', sortProperty: 'rating', order: 'desc'},
		{id: 3, name: '🠕 цене ', sortProperty: 'price', order: 'asc'},
		{id: 4, name: '🠗 цене', sortProperty: 'price', order: 'desc'},
		{id: 5, name: '🠕 алфавиту', sortProperty: 'title', order: 'asc'},
		{id: 6, name: '🠗 алфавиту', sortProperty: 'title', order: 'desc'},
	],
	page: 1,
	limit: 4,
	folders: [],
}

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.page = 1;
			state.categoryId = action.payload;
		},
		setSearchValue(state, action){
			state.searchValue = action.payload;
		},
		setSort(state, action) {
			state.page = 1;
			state.sort = action.payload;
		},
		setPage(state, action) {
			state.page = action.payload;
		},
		setFields(state, action) {
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

export const selectorFilter = state => state.filter;
export const selectorCategoryId = state => state.filter.categoryId

export const {setCategoryId, setSort, setPage, setFields, setFieldsDefault, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;