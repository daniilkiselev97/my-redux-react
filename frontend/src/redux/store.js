import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import errorReducer from './slices/errorSlice';
import booksReducer from './slices/booksSlice';
const store = configureStore({
    reducer: {
        books: booksReducer,
        filter: filterReducer,
        error: errorReducer,
    },
});
export default store;
