import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBrands } from './getQuery';

const API = import.meta.env.VITE_API;
const token = localStorage.getItem("adminToken")

export const editCategory = createAsyncThunk("put/editCategory", async (formdata, { dispatch }) => {
    try {
        await axios.put(`${API}/Category/update-category`, formdata, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getCategories())
    } catch (error) {
        console.error(error);
    }
})

export const editBrand = createAsyncThunk("put/editBrand", async(obj, {dispatch})=>{
    try {
        await axios.put(`${API}/Brand/update-brand?Id=${obj.id}&BrandName=${obj.name}`,null,{
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
    name: 'put',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => { }
});

export default deleteSlice.reducer;
