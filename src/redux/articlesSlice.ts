import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface Article {
  id: number;
  title: string;
  source: string;
  author: string;
  date: string;
  content: string;
  image: string;
}

interface ArticlesState {
  articles: Article[];
  filteredArticles: Article[];
  filters: {
    source: string[];
    author: string[];
    sortBy: 'date' | 'title';
  };
  page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    currentPage?:number
}

const initialState: ArticlesState = {
  articles: [],
  filteredArticles: [],
  filters: {
    source: [],
    author: [],
    sortBy: 'date',
  },
  page: 1,
    totalPages: 1,
    loading: false,
    error: null,
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await axios.get('https://dummy-rest-api.specbee.site/api/v1/news');
  return response.data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    filterArticles(state) {
      let filtered = state.articles;
      if (state.filters.source.length > 0) {
        filtered = filtered.filter(article => state.filters.source.includes(article.source));
      }

      if (state.filters.author.length > 0) {
        filtered = filtered.filter(article => state.filters.author.includes(article.author));
      }

      if (state.filters.sortBy === 'date') {
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (state.filters.sortBy === 'title') {
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      state.filteredArticles = filtered;
      state.totalPages = Math.ceil(filtered.length / 5);
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      if (state.filters.source.includes(action.payload)) {
        state.filters.source = state.filters.source.filter(source => source !== action.payload);
      } else {
        state.filters.source = [...state.filters.source, action.payload];
      }
      articlesSlice.caseReducers.filterArticles(state);
    },
    setAuthorFilter(state, action: PayloadAction<string>) {
      if (state.filters.author.includes(action.payload)) {
        state.filters.author = state.filters.author.filter(author => author !== action.payload);
      } else {
        state.filters.author = [...state.filters.author, action.payload];
      }
      articlesSlice.caseReducers.filterArticles(state);
    },
    setSortBy(state, action: PayloadAction<'date' | 'title'>) {
      state.filters.sortBy = action.payload;
      articlesSlice.caseReducers.filterArticles(state);
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      articlesSlice.caseReducers.filterArticles(state);
    });
  },
});

export const { setCategoryFilter, setAuthorFilter, setSortBy, setPage } = articlesSlice.actions;

export const selectFilteredArticles = (state: RootState) => {
  const startIndex = (state.articles.page - 1) * 5;
  const endIndex = startIndex + 5;
  return state.articles.filteredArticles.slice(startIndex, endIndex);
};

export const selectTotalPages = (state: RootState) => state.articles.totalPages;

export default articlesSlice.reducer;
