import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBrands, getColors, getProducts, getSubCategories } from './getQuery';

const API = import.meta.env.VITE_API;
const token = localStorage.getItem("adminToken")

export const deleteProduct = createAsyncThunk("delete/deleteProduct", async (id, { dispatch, rejectWithValue }) => {
    try {
        await axios.delete(`${API}/Product/delete-product?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(getProducts());
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data || "Error deleting product");
    }
})

export const deleteBrand = createAsyncThunk("delete/deleteBrand", async (id, { dispatch, rejectWithValue }) => {
    try {
        await axios.delete(`${API}/Brand/delete-brand?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(getBrands());
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data || "Error deleting brand");
    }
})

export const deleteSubCategory = createAsyncThunk('delete/deleteSubCategory', async (id, { dispatch, rejectWithValue }) => {
    try {
        await axios.delete(`${API}/SubCategory/delete-sub-category?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(getSubCategories());
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data || "Error deleting subcategory");
    }
})

export const deleteColor = createAsyncThunk("delete/deleteColor",async(id,{dispatch})=>{
    try {
        await axios.delete(`${API}/Color/delete-color?id=${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getColors())
    } catch (error) {
        console.error(error);
    }
})

const initialState = {
    loading: false,
    error: null,
    success: false,
};

const deleteSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete product";
                state.success = false;
            })

            .addCase(deleteBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteBrand.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete brand";
                state.success = false;
            })

            .addCase(deleteSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteSubCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete subcategory";
                state.success = false;
            })
    }
});

export const { resetStatus } = deleteSlice.actions;
export default deleteSlice.reducer;
