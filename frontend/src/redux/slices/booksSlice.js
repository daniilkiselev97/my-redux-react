import { createSlice } from '@reduxjs/toolkit';
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

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export const selectBooks = (state) => state.books

export default booksSlice.reducer
