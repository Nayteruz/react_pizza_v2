import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "../../utils/axiosInstance";

interface IFolder {
  id: number,
  name: string;
}

interface IState {
  items: IFolder[];
  loading: boolean;
  error: string;
}

export const fetchFolders = createAsyncThunk(
  "folder/fetchItems",
  async () => {
    const { data } = await axios.get("/folders");
    return await data;
  }
);

const initialState: IState = {
  items: [],
  loading: false,
  error: ""
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Array<IFolder>>) {
      state.items = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchFolders.fulfilled, (state, action: PayloadAction<IFolder[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.error = action.error.message||'';
        state.loading = false;
      });
  }
});

export const selectorItems = (state: RootState) => state.folder.items;

export const { setItems } = folderSlice.actions;

export default folderSlice.reducer;