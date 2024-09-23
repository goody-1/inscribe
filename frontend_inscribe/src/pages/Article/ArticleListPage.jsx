import React from 'react';
import ArticleList from '../../components/Article/ArticleList';
// import CategoryFilter from '../../components/Misc/CategoryFilter';
// import SearchBar from '../../components/Misc/Searchbar';

const ArticlesPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Articles
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          {/* <Searchbar />
          <CategoryFilter /> */}
        </div>

        {/* Article List */}
        <ArticleList />
      </div>
    </div>
  );
};

export default ArticlesPage;
