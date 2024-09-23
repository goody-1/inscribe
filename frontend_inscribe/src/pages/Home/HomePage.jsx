import React from 'react';
import ArticleList from '../../components/Article/ArticleList';
// import PopularArticles from '../../components/Misc/PopularArticles';
// import CategoryFilter from '../../components/Misc/CategoryFilter';
// import SearchBar from '../../components/Misc/Searchbar';

import inscribe_banner from '../../assets/home/inscribe_banner.jpeg';


const HomePage = () => {
    console.log("HomePage is rendered");
  return (
    <div className="rounded-md">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Inscribe
          </h1>
          <p className="text-lg text-gray-600">
            Discover insightful inscriptions from inspired writers across the world.
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
          {/* <Searchbar />
          <CategoryFilter /> */}
        </div>

        {/* Main Content Section */}
        <div className='flex flex-col justify-center items-center'>
          <img src={inscribe_banner} alt="Someone writing" className='rounded-lg max-h-80'/>
          <a href="https://www.vecteezy.com/free-photos/writing-banner" className='text-yellow-600 mt-1'>
            Writing Banner Stock photos by Vecteezy
          </a>
        </div>
        <div className='bg-black h-0.5 mt-8 w-full'></div>
        <div className="mt-8">
          {/* Article List */}
          <section id='article' className="lg:col-span-2">
            <ArticleList />
          </section>

          {/* Sidebar with Popular Articles */}
          <aside>
            {/* <PopularArticles /> */}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
