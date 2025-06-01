import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getBrands, getProducts, getSubCategories } from './getQuery';

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

export const editBrand = createAsyncThunk("put/editBrand", async (obj, { dispatch }) => {
    try {
        await axios.put(`${API}/Brand/update-brand?Id=${obj.id}&BrandName=${obj.name}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getBrands())
    } catch (error) {
        console.error(error);
    }
})

export const editSubCategory = createAsyncThunk("put/editSubCategory", async (obj, { dispatch }) => {
    try {
        await axios.put(`${API}/SubCategory/update-sub-category?Id=${obj.id}&CategoryId=${obj.categoryId}&SubCategoryName=${obj.name}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getSubCategories())
    } catch (error) {
        console.error(error);
    }
})
export const editProduct = createAsyncThunk(
  "put/editProduct",
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API}/Product/update-product?Id=${obj.Id}&BrandId=${obj.BrandId}&ColorId=${obj.ColorId}&ProductName=${obj.ProductName}&Description=${obj.Description}&Quantity=${obj.Quantity}&Weight=${obj.Weight}&Size=${obj.Size}&Code=${obj.Code}&Price=${obj.Price}&HasDiscount=${obj.HasDiscount}&DiscountPrice=${obj.DiscountPrice}&SubCategoryId=${obj.SubCategoryId}`,
        {},{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch(getProducts());
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.statusText);
      }
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
    editCategory: { loading: false, error: null, success: false },
    editBrand: { loading: false, error: null, success: false },
    editSubCategory: { loading: false, error: null, success: false },
    editProduct: { loading: false, error: null, success: false },
};

const putSlice = createSlice({
    name: 'put',
    initialState,
    reducers: {
        clearPutState(state) {
            state.editCategory = { loading: false, error: null, success: false };
            state.editBrand = { loading: false, error: null, success: false };
            state.editSubCategory = { loading: false, error: null, success: false };
            state.editProduct = { loading: false, error: null, success: false };
        },
        clearEditProductState(state) {
            state.editProduct = { loading: false, error: null, success: false };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editCategory.pending, (state) => {
                state.editCategory.loading = true;
                state.editCategory.error = null;
                state.editCategory.success = false;
            })
            .addCase(editCategory.fulfilled, (state) => {
                state.editCategory.loading = false;
                state.editCategory.success = true;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.editCategory.loading = false;
                state.editCategory.success = false;
                state.editCategory.error = action.error.message || 'Failed to update category';
            });

        builder
            .addCase(editBrand.pending, (state) => {
                state.editBrand.loading = true;
                state.editBrand.error = null;
                state.editBrand.success = false;
            })
            .addCase(editBrand.fulfilled, (state) => {
                state.editBrand.loading = false;
                state.editBrand.success = true;
            })
            .addCase(editBrand.rejected, (state, action) => {
                state.editBrand.loading = false;
                state.editBrand.success = false;
                state.editBrand.error = action.error.message || 'Failed to update brand';
            });

        builder
            .addCase(editSubCategory.pending, (state) => {
                state.editSubCategory.loading = true;
                state.editSubCategory.error = null;
                state.editSubCategory.success = false;
            })
            .addCase(editSubCategory.fulfilled, (state) => {
                state.editSubCategory.loading = false;
                state.editSubCategory.success = true;
            })
            .addCase(editSubCategory.rejected, (state, action) => {
                state.editSubCategory.loading = false;
                state.editSubCategory.success = false;
                state.editSubCategory.error = action.error.message || 'Failed to update subcategory';
            });

        builder
            .addCase(editProduct.pending, (state) => {
                state.editProduct.loading = true;
                state.editProduct.error = null;
                state.editProduct.success = false;
            })
            .addCase(editProduct.fulfilled, (state) => {
                state.editProduct.loading = false;
                state.editProduct.success = true;
                state.editProduct.error = null
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.editProduct.loading = false;
                state.editProduct.success = false;
                state.editProduct.error = action.error.message || 'Failed to update product';
            });
    },
});

export const { clearPutState, clearEditProductState } = putSlice.actions;

export default putSlice.reducer;
