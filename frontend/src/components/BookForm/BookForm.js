import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addBook } from '../../redux/slices/booksSlice';
import booksData from '../../data/books.json';
import './BookForm.css';
import createBookWithID from '../../utils/createBookWithId';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && author) {
            const book = createBookWithID({
                title,
                author,
            }, 'manual');
            dispatch(addBook(book));
            setTitle('');
            setAuthor('');
        }
    };
    const handleOnRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        const randomBookWithId = createBookWithID(randomBook, 'random');
        dispatch(addBook(randomBookWithId));
    };
    const handleRandomBookViaApi = async () => {
        try {
            const res = await axios.get('http://localhost:4000/random-book');
            if (res?.data?.title && res?.data?.title)
                dispatch(addBook(createBookWithID(res.data,'API')));
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="app-block book-form">
            <h2>Add a new Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    ></input>
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }}
                    ></input>
                </div>
                <button type="submit">Add book</button>
                <button type="button" onClick={handleOnRandomBook}>
                    Add Random
                </button>
                <button type="button" onClick={handleRandomBookViaApi}>
                    Add random via api
                </button>
            </form>
        </div>
    );
};
export default BookForm;
