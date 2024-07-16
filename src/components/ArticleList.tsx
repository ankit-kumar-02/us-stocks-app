import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchArticles, selectFilteredArticles } from '../redux/articlesSlice';
import ArticleCard from './ArticleCard';
import Loader from './Loader';
import Pagination from './Pagination';
//import '../styles/ArticleList.scss';

const ArticleList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.articles);
  const articles = useSelector((state: RootState) => selectFilteredArticles(state));

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="article-list">
      {articles.length === 0 ? (
        <p>No result found for Selection</p>
      ) : 
      (
        <>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        <Pagination />
        </>
      )}
    </div>

  );
};

export default ArticleList;
