import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API } from '../../apps/api';

const getContacts = createAsyncThunk(
  'contacts/get',
  async (params: GetContactsQueryParams, thunkApi) => {
    try {
      const response = await API.getContacts(params);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<ResponseError>;

      return thunkApi.rejectWithValue(error?.response?.data.detail);
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id: number, thunkApi) => {
    try {
      const response = await API.deleteContacts(id);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<ResponseError>;

      return thunkApi.rejectWithValue(error?.response?.data.detail);
    }
  }
);

const updateContact = createAsyncThunk(
  'contacts/update',
  async (params: ContactItem, thunkApi) => {
    try {
      const response = await API.updateContact(params.id, params);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<ResponseError>;

      return thunkApi.rejectWithValue(error?.response?.data.detail);
    }
  }
);

const createContact = createAsyncThunk(
  'contacts/create',
  async (params: Omit<ContactItem, 'id'>, thunkApi) => {
    try {
      const response = await API.createContact(params);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<ResponseError>;

      return thunkApi.rejectWithValue(error?.response?.data.detail);
    }
  }
);

const initialState: ContactInitState = {
  data: {
    links: {
      next: null,
      previous: null,
    },
    count: 0,
    results: [],
  },
  status: 'idle',
  error: '',
  selectedContact: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Get All Contacts
      .addCase(getContacts.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete Contact
      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Contact
      .addCase(createContact.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(createContact.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update Contact
      .addCase(updateContact.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default contactsSlice.reducer;
export { createContact, deleteContact, getContacts, updateContact };
