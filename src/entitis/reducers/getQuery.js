import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API;

export const getProducts = createAsyncThunk("get/getProducts",async()=>{
    try {
        let {data} = await axios.get(`${API}/Product/get-products`)
        return data.data
    } catch (error) {
        console.error(error);
    }
})

export const getCategories = createAsyncThunk("get/getCategories", async()=>{
  try {
    let {data} = await axios.get(`${API}/Category/get-categories`)
    return data.data
  } catch (error) {
    console.error(error);
  }
})

export const getSubCategories = createAsyncThunk("get/getSubCategories", async()=>{
  try {
    let {data} = await axios.get(`${API}/SubCategory/get-sub-category`)
    return data.data
  } catch (error) {
    console.error(error);
  }
})

export const getBrands = createAsyncThunk("get/getBrands", async()=>{
  try {
    let {data} = await axios.get(`${API}/Brand/get-brands`)
    return data.data
  } catch (error) {
    console.error(error);
  }
})

export const getColors = createAsyncThunk("get/getColors", async()=>{
  try {
    let {data} = await axios.get(`${API}/Color/get-colors`)
    return data.data
  } catch (error) {
    console.error(error);
  }
})

export const getProductById = createAsyncThunk("get/getProductById",async(id)=>{
  try {
    let {data} = await axios.get(`${API}/Product/get-product-by-id?id=${id}`)
    return data.data
  } catch (error) {
    console.error(error);
  }
})

const getSlice = createSlice({
  name: 'get',
  initialState: { 
    products:[],
    categories:[],
    brands:[],
    colors:[],
    subCategories:[],
    productId:null,
    product:{}
   },
  reducers: {
    changeProduct:(state,actions)=>{
      state.productId = actions.payload
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(getProducts.fulfilled, (state, action)=>{
        state.products = action.payload.products
    })
    builder.addCase(getCategories.fulfilled, (state, actions)=>{
      state.categories = actions.payload
    })
    builder.addCase(getBrands.fulfilled, (state, actions)=>{
      state.brands = actions.payload
    })
    builder.addCase(getColors.fulfilled, (state, actions)=>{
      state.colors = actions.payload
    })
    builder.addCase(getSubCategories.fulfilled,(state,action)=>{
      state.subCategories = action.payload
    })
    builder.addCase(getProductById.fulfilled,(state,action)=>{
      state.product=action.payload
    })
  }
});

export const { changeProduct } = getSlice.actions

export default getSlice.reducer;
