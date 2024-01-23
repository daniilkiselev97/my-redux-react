import { useDispatch, useSelector } from 'react-redux';
import './Filter.css';
import {
    resetFilters,
    selectTitleFilter,
    setTitleFilter,
    setAuthorFilter,
    selectAuthorFilter,
} from '../../redux/slices/filterSlice';
const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const handleTitleFilterChange = (e) => {
        dispatch(setTitleFilter(e.target.value));
    };
    const handleAuthorFilterChange = (e) => {
        dispatch(setAuthorFilter(e.target.value));
    };
    const handleResetFilters = () => {
        dispatch(resetFilters());
    };
    return (
        <div className="app-block filter">
            <div className="filter-row">
                <div className="filter-group">
                    <input
                        onChange={handleTitleFilterChange}
                        type="text"
                        value={titleFilter}
                        placeholder="Filter by title..."
                    ></input>
                </div>
                <div className="filter-group">
                    <input
                        onChange={handleAuthorFilterChange}
                        type="text"
                        value={authorFilter}
                        placeholder="Filter by author..."
                    ></input>
                </div>
                <button type="button" onClick={handleResetFilters}>
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default Filter;
