import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	items: [],
}

const folderSlice = createSlice({
	name: 'folder',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	}
})

export const selectorItems = state => state.folder.items;

export const {setItems} = folderSlice.actions;

export default folderSlice.reducer;