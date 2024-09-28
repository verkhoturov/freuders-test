import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Specialist, FilterFormState } from "../types";
import { getSpecialistsList } from "../api/getSpecialistsList";


export const fetchSpecialists = createAsyncThunk(
    'specialists/fetchSpecialists',
    async (params: FilterFormState, { rejectWithValue }) => {
        try {
            const data = await getSpecialistsList(params);
            return data?.items;
        } catch (error: unknown) {
            // @ts-ignore
            return rejectWithValue(error.message || 'Не удалось загрузить данные');
        }
    }
);

export interface SpecialistsState {
    list: Specialist[];
    loading: boolean;
    error: string | null;
}

const initialState: SpecialistsState = {
    list: [],
    loading: false,
    error: null
}

export const specialistsSlice = createSlice({
    name: 'specialists',
    initialState,
    reducers: {
        setSpecialistsList: (state, action: PayloadAction<Specialist[]>) => {
            state.list = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecialists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpecialists.rejected, (state, action) => {
                state.loading = false;
                state.error = `${action.payload || 'Неизвестная ошибка'}`;
            })
            .addCase(fetchSpecialists.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload || [];
            })
    },
})

export const { setSpecialistsList } = specialistsSlice.actions;

export default specialistsSlice.reducer;