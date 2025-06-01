import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getBrands,
  getCategories,
  getProducts,
  getSubCategories,
} from './getQuery';

const API = import.meta.env.VITE_API;
const token = localStorage.getItem('adminToken');

export const login = createAsyncThunk(
  'post/postLoginData',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API}/Account/login`, credentials);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  'post/addCategory',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/Category/add-category`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getCategories());
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.statusText);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const addBrand = createAsyncThunk(
  'post/addBrand',
  async (brandName, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/Brand/add-brand?BrandName=${brandName}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getBrands());
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.statusText);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'post/addProducts',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/Product/add-product`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
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

export const addSubCategory = createAsyncThunk(
  'post/addSubCategory',
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/SubCategory/add-sub-category?CategoryId=${obj.id}&SubCategoryName=${obj.name}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getSubCategories());
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
  isLogined: false,
  isLoadingLogin: false,
  loginError: null,

  addCategory: {
    loading: false,
    success: false,
    error: null,
  },

  addBrand: {
    loading: false,
    success: false,
    error: null,
  },

  addProduct: {
    loading: false,
    success: false,
    error: null,
  },
  addSubCategory: {
    loading: false,
    success: false,
    error: null,
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changeLogin: (state) => {
      state.isLogined = !state.isLogined;
    },
    clearPostState: (state) => {
      state.addCategory = { loading: false, success: false, error: null };
      state.addBrand = { loading: false, success: false, error: null };
      state.addProduct = { loading: false, success: false, error: null };
      state.addSubCategory = { loading: false, success: false, error: null };
    },
    clearAddProductState: (state) => {
      state.addProduct = { loading: false, success: false, error: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoadingLogin = true;
      state.isLogined = false;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('adminToken', action.payload);
      state.isLogined = true;
      state.isLoadingLogin = false;
      state.loginError = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLogined = false;
      state.isLoadingLogin = false;
      state.loginError = action.payload || 'Unknown error';
    });

    builder.addCase(addCategory.pending, (state) => {
      state.addCategory.loading = true;
      state.addCategory.success = false;
      state.addCategory.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.addCategory.loading = false;
      state.addCategory.success = true;
      state.addCategory.error = null;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.addCategory.loading = false;
      state.addCategory.success = false;
      state.addCategory.error = action.payload || 'Failed to add category';
    });

    builder.addCase(addBrand.pending, (state) => {
      state.addBrand.loading = true;
      state.addBrand.success = false;
      state.addBrand.error = null;
    });
    builder.addCase(addBrand.fulfilled, (state) => {
      state.addBrand.loading = false;
      state.addBrand.success = true;
      state.addBrand.error = null;
    });
    builder.addCase(addBrand.rejected, (state, action) => {
      state.addBrand.loading = false;
      state.addBrand.success = false;
      state.addBrand.error = action.payload || 'Failed to add brand';
    });

    builder.addCase(addProduct.pending, (state) => {
      state.addProduct.loading = true;
      state.addProduct.success = false;
      state.addProduct.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.addProduct.loading = false;
      state.addProduct.success = true;
      state.addProduct.error = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.addProduct.loading = false;
      state.addProduct.success = false;
      state.addProduct.error = action.payload || 'Failed to add product';
    });

    builder.addCase(addSubCategory.pending, (state) => {
      state.addSubCategory.loading = true;
      state.addSubCategory.success = false;
      state.addSubCategory.error = null;
    });
    builder.addCase(addSubCategory.fulfilled, (state) => {
      state.addSubCategory.loading = false;
      state.addSubCategory.success = true;
      state.addSubCategory.error = null;
    });
    builder.addCase(addSubCategory.rejected, (state, action) => {
      state.addSubCategory.loading = false;
      state.addSubCategory.success = false;
      state.addSubCategory.error = action.payload || 'Failed to add subcategory';
    });
  },
});

export const {
  changeLogin,
  clearPostState,
  clearAddProductState,
} = postSlice.actions;

export default postSlice.reducer;
