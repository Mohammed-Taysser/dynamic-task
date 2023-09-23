import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import routes from '../../apps/Routes';
import { API } from '../../apps/api';
import { LocalStorage } from '../../apps/localStorage';

const login = createAsyncThunk(
  'auth/login',
  async (body: LoginBodyState, thunkApi) => {
    try {
      const response = await API.login(body);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ResponseError>;

      return thunkApi.rejectWithValue(error?.response?.data.detail);
    }
  }
);

const initialState: RequestState<LoginResponse> = {
  data: {
    refresh: '',
    access: '',
    first_name: '',
    last_name: '',
    email: '',
    is_superuser: false,
    is_staff: false,
  },
  status: 'idle',
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      LocalStorage.remove('accessToken');
      routes.navigate('/login');
      LocalStorage.remove('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        LocalStorage.set('accessToken', action.payload.access);
        LocalStorage.set('refreshToken', action.payload.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export { login };
