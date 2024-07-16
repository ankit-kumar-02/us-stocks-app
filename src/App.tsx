import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ArticleList from './components/ArticleList';
import Filter from './components/Filter';
import Pagination from './components/Pagination';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    
    <Provider store={store}>
      <div className="app">
        <Filter />
        <ArticleList />
      </div>
    </Provider>
  );
};

export default App;
