import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setPage } from '../redux/articlesSlice';
import '../styles/Pagination.scss';

const Pagination: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { page, totalPages } = useSelector((state: RootState) => state.articles);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i}>
        <button
          className={page === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
          disabled={page === i}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
        </li>
        {pages}
        <li>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
