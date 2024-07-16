import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setCategoryFilter, setAuthorFilter, setSortBy } from '../redux/articlesSlice';
import '../styles/Filter.scss';

const Filter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { articles, filters } = useSelector((state: RootState) => state.articles);

  // Extract unique categories and authors from articles
  const categories = Array.from(new Set(articles.map(article => article.source)));
  const authors = Array.from(new Set(articles.map(article => article.author)));

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h3>Category</h3>
        {categories.map(source => (
          <div key={source} className="filter-option">
            <input
              type="checkbox"
              id={source}
              checked={filters.source.includes(source)}
              onChange={() => dispatch(setCategoryFilter(source))}
            />
            <label htmlFor={source}>{source}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Author</h3>
        {authors.map(author => (
          <div key={author} className="filter-option">
            <input
              type="checkbox"
              id={author}
              checked={filters.author.includes(author)}
              onChange={() => dispatch(setAuthorFilter(author))}
            />
            <label htmlFor={author}>{author}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Sort By</h3>
        <div className="filter-option">
          <input
            type="radio"
            id="sortByDate"
            name="sortBy"
            checked={filters.sortBy === 'date'}
            onChange={() => dispatch(setSortBy('date'))}
          />
          <label htmlFor="sortByDate">Date</label>
        </div>
        <div className="filter-option">
          <input
            type="radio"
            id="sortByTitle"
            name="sortBy"
            checked={filters.sortBy === 'title'}
            onChange={() => dispatch(setSortBy('title'))}
          />
          <label htmlFor="sortByTitle">Title</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
