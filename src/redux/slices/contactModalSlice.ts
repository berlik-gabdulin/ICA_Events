import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';

type IStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
interface ContactModalState {
  open: boolean;
  status: IStatus;
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
        const errorMessage = `Network response was not ok: ${response.status} ${response.statusText}`;
        return rejectWithValue(errorMessage);
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
    setStatus: (state: ContactModalState, action: PayloadAction<IStatus>) => {
      state.status = action.payload;
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

export const { openModal, closeModal, setSelectedIndustry, setStatus } = contactModalSlice.actions;

export default contactModalSlice.reducer;
