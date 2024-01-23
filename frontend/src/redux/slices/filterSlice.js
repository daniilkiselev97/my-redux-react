import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    title: '',
};
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            //you can mutate object thanks to Immer Library
            state.title = action.payload;
            //Or you can also return new state as usually
            // return {
            //     ...state,
            //     title: action.payload,
            // };
        },
        resetFilters: (state) => {
            return initialState;
        },
    },
});
export const { setTitleFilter, resetFilters } = filterSlice.actions;
export const selectTitleFilter = (state) => state.filter.title;
export default filterSlice.reducer;
