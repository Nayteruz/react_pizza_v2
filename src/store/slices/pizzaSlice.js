import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../utils/axiosInstance";

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchItems',
	async (params) => {
		//const {category} = params;
		const {data} = await axios.get('/items', {
			params
		});
		return data
	}
)

const initialState = {
	items: [],
	total: 0,
	loading: false,
	error: '',
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload.items;
		},
		setTotal(state, action) {
			state.total = action.payload.count;
		},
		setFolders(state, action){
			state.folders = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.loading = true;
				state.error = '';
				state.total = 0;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload.items;
				state.total = action.payload.count;
				state.loading = false;
			})
			.addCase(fetchPizzas.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
				state.total = 0;
				state.items = [];
			})
	}
})

export const selectorPizza = state => state.pizza;

export const {setItems, setTotal, setFolders} = pizzaSlice.actions;

export default pizzaSlice.reducer;