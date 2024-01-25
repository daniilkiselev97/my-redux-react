import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = {
    books: [],
    isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setError(error.message));
            // throw error;
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state = initialState, action) => {
            state.books.push(action.payload);
        },
        deleteBook(state, action) {
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload),
            };
        },
        toggleFavorite(state, action) {
            return state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            });
            // return state.map((book) => {
            //     return book.id === action.payload
            //         ? { ...book, isFavorite: !book.isFavorite }
            //         : book;
            // });
        },
    },
    //OPTION 1
    extraReducers: {
        [fetchBook.fulfilled]: (state, action) => {
            state.isLoadingViaAPI = false;
            if (action.payload.title && action.payload.author) {
                state.books.push(createBookWithID(action.payload, 'API'));
            }
        },
        [fetchBook.pending]: (state) => {
            state.isLoadingViaAPI = true;
        },
        [fetchBook.rejected]: (state) => {
            state.isLoadingViaAPI = false;
        },
    },
    //OPTION 2
    // extraReducers(builder) {
    //     builder.addCase(fetchBook.fulfilled, (state, action) => {
    //         if (action.payload.title && action.payload.author) {
    //             state.books.push(createBookWithID(action.payload, 'API'));
    //         }
    //     });
    // },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;
