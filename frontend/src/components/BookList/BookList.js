import { useSelector, useDispatch } from 'react-redux';
import {
    deleteBook,
    toggleFavorite,
    selectBooks,
} from '../../redux/slices/booksSlice';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import './BookList.css';
import {
    selectTitleFilter,
    selectAuthorFilter,
    selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
const BookList = () => {
    const books = useSelector(selectBooks);
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const isCheckedFavoriteBooks = useSelector(selectOnlyFavoriteFilter);
    const dispatch = useDispatch();
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const highlightMatch = (text, filter) => {
        if (!filter) return text;
        const regex = new RegExp(`(${filter})`, 'gi');
        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={i} className="highlight">
                        {substring}
                    </span>
                );
            }
            return substring;
        });
    };
    let filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(titleFilter.toLowerCase());
    });
    filteredBooks = filteredBooks.filter((book) => {
        return book.author.toLowerCase().includes(authorFilter.toLowerCase());
    });
    if (isCheckedFavoriteBooks) {
        filteredBooks = filteredBooks.filter((book) => {
            return book.isFavorite;
        });
    }

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
                                {++i}. {highlightMatch(book.title, titleFilter)}{' '}
                                by{' '}
                                <strong>
                                    {highlightMatch(book.author, authorFilter)}
                                </strong>
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
