import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
import type { RootState } from "../store";
import { IProduct, SortParams } from "../../@types/shared_types";

interface IPizzaList {
  items: IProduct[];
  count: number;
}

interface IState {
  items: IProduct[];
  item: IProduct | null;
  total: number;
  loading: boolean;
  error: string | undefined;
}


export const fetchPizzas = createAsyncThunk<IPizzaList, SortParams>(
  "pizza/fetchItems",
  async (params) => {
    const { data } = await axios.get<IPizzaList>("/items", {
      params
    });
    return data;
  }
);

export const fetchPizza = createAsyncThunk<IProduct, string | undefined>(
  "pizza/fetchItem",
  async (id) => {
    const { data } = await axios.get<IProduct>(`/items/${id}`);
    return data;
  }
);

const initialState: IState = {
  items: [],
  item: null,
  total: 0,
  loading: false,
  error: ""
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizzaList>) {
      state.items = action.payload.items;
    },
    setTotal(state, action: PayloadAction<IPizzaList>) {
      state.total = action.payload.count;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.total = 0;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPizzaList>) => {
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
      .addCase(fetchPizza.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(fetchPizza.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.item = null;
      });
  }
});

export const selectorPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;