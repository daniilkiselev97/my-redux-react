import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithId';

const initialState = [];

export const fetchBook = createAsyncThunk('books/fetchBook', async () => {
    const res = await axios.get('http://localhost:5000/random-book');
    return res.data;
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state = initialState, action) => {
            state.push(action.payload);
        },
        deleteBook(state, action) {
            return state.filter((book) => book.id !== action.payload);
        },
        toggleFavorite(state, action) {
            return state.map((book) => {
                return book.id === action.payload
                    ? { ...book, isFavorite: !book.isFavorite }
                    : book;
            });
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            if (action.payload.title && action.payload.author) {
                state.push(createBookWithID(action.payload, 'API'));
            }
        });
        
    },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
