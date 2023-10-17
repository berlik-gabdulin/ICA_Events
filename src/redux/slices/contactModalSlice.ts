import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';

interface ContactModalState {
  open: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedIndustry: string | null;
}

const initialState: ContactModalState = {
  open: false,
  status: 'idle',
  error: null,
  selectedIndustry: null,
};

export const submitForm = createAsyncThunk<string, URLSearchParams, { rejectValue: string }>(
  'contactModal/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('/public/sendmail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.text();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactModalSlice = createSlice({
  name: 'contactModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
    setSelectedIndustry: (state, action: PayloadAction<string>) => {
      // Добавлено
      state.selectedIndustry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = 'succeeded';
        state.open = false;
      })
      .addCase(
        submitForm.rejected,
        (state, action: PayloadAction<string | undefined, string, unknown, SerializedError>) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Unknown error';
        }
      );
  },
});

export const { openModal, closeModal, setSelectedIndustry } = contactModalSlice.actions;

export default contactModalSlice.reducer;
