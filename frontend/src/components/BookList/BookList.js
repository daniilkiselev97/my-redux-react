import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import './BookList.css';
import { selectTitleFilter } from '../../redux/slices/filterSlice';
const BookList = () => {
    const books = useSelector((state) => state.books);
    const titleFilter = useSelector(selectTitleFilter);
    const dispatch = useDispatch();
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(titleFilter.toLowerCase());
    });

    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {!books.length ? (
                <p>No books available</p>
            ) : (
                <ul>
                    {filteredBooks.map((book, i) => (
                        <li key={book.id}>
                            <div className="book-info">
                                {++i}. {book.title} by{' '}
                                <strong>{book.author}</strong>
                            </div>
                            <div
                                className="book-actions"
                                onClick={() => {
                                    handleToggleFavorite(book.id);
                                }}
                            >
                                {book.isFavorite ? (
                                    <BsBookmarkStarFill className="star-icon" />
                                ) : (
                                    <BsBookmarkStar className="star-icon" />
                                )}
                                <button
                                    onClick={() => {
                                        handleDeleteBook(book.id);
                                    }}
                                >
                                    Delete book
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;
