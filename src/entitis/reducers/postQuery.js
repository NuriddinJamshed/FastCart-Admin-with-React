import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBrands, getCategories, getProducts } from './getQuery';

const API = import.meta.env.VITE_API;
const token = localStorage.getItem("adminToken")

export const login = createAsyncThunk(
  "post/postLoginData",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API}/Account/login`, credentials);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk("post/addCategory", async (formData, { dispatch }) => {
  try {
    await axios.post(`${API}/Category/add-category`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(getCategories())
  } catch (error) {
    console.error(error);
  }
})

export const addBrand = createAsyncThunk("post/addBrand", async (brandName, { dispatch }) => {
  try {
    await axios.post(`${API}/Brand/add-brand?BrandName=${brandName}`,null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(getBrands())
  } catch (error) {
    console.error(error);
  }
})

export const addProduct = createAsyncThunk("post/addProducts",async(formData,{dispatch})=>{
  try {
    await axios.post(`${API}/Product/add-product`,formData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(getProducts())
  } catch (error) {
    console.error(error);
  }
})

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLogined: false,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    changeLogin: (state) => {
      state.isLogined = !state.isLogined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isLogined = false;
      state.isError = false;
      state.errorMessage = "";
    })
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("adminToken", action.payload);
      state.isLogined = true;
      state.isLoading = false;
      state.isError = false;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLogined = false;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload || "Unknown error";
    });
  }
});

export const { changeLogin } = postSlice.actions;
export default postSlice.reducer;
