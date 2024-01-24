import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithId';

const initialState = [];

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
});

export const thunkFunction = async (dispatch, getState) => {
    try {
        const res = await axios.get('http://localhost:4000/random-book');
        if (res?.data?.title && res?.data?.title)
            dispatch(addBook(createBookWithID(res.data, 'API')));
    } catch (error) {
        console.log(error.message);
    }
};

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
