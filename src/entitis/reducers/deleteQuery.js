import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBrands, getProducts } from './getQuery';

const API = import.meta.env.VITE_API;
const token = localStorage.getItem("adminToken")

export const deleteProduct = createAsyncThunk("delete/deleteProduct", async(id,{dispatch})=>{
    try {
        await axios.delete(`${API}/Product/delete-product?id=${id}`,{
          headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getProducts())
    } catch (error) {
        console.error(error);
    }
})

export const deleteBrand = createAsyncThunk("delete/deleteBrand", async(id,{dispatch})=>{
    try {
        await axios.delete(`${API}/Brand/delete-brand?id=${id}`,{
          headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getBrands())
    } catch (error) {
        console.error(error);
    }
})

const deleteSlice = createSlice({
  name: 'delete',
  initialState: { 
    products:[]
   },
  reducers: {},
  extraReducers: (builder)=>{}
});

export default deleteSlice.reducer;
