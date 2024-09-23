import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCard from '../Comment/Comment';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/articles/')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  return (
    <div className='flex flex-col'>
      <h2 className='text-yellow-500 self-center text-xl mb-4 font-semibold'>Inscriptions</h2>

      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

const ArticleCard = ({ article }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const contentLimit = 250; // Character limit for truncation

  // Truncate content if it exceeds the limit
  const truncatedContent = article.content.length > contentLimit
    ? article.content.slice(0, contentLimit) + '...'
    : article.content;

  return (
    <article className='mb-4'>
      <div className='article-head flex justify-between bg-gray-900 text-yellow-400 rounded p-3 px-6 rounded-b-none font-mono'>
        <div>
          <span>{article.author_profile.profile.avatar}</span>
          <span>{article.author_profile.username}</span>
        </div>
        <div>
          <span>Follow</span>
        </div>
      </div>
      <div className='article-body flex flex-col bg-gray-800 p-3 px-6 text-white font-light space-y-4'>
        <div>
          <h2 className='font-bold mb-2'>{article.title}</h2>
          <h3>{article.author_profile.profile.firstname}</h3>
          <p className='font-sans'>
            {showFullContent ? article.content : truncatedContent}
          </p>
          {article.content.length > contentLimit && (
            <p
              className=' flex justify-between text-yellow-400 text-xs mt-3 cursor-pointer'
              onClick={() => setShowFullContent(!showFullContent)}
            >
              <span className='hover:text-gray-200'>{showFullContent ? 'Read less' : 'Read more'}</span>
              <span className='text-white'>{article.humanized_updated_at}</span>
            </p>
          )}
        </div>
      </div>
      <div className='article-footer flex flex-col p-2 px-6 pb-4 bg-gray-900 text-yellow-400 rounded rounded-t-none font-mono text-sm'>
        <div className='flex justify-between'>
          <div className='flex space-x-2'>
            <span>{article.comment_count}</span>
            <span>{article.comment_count === 1 ? 'Comment' : 'Comments'}</span>
          </div>
          <div className='flex justify-between space-x-6'>
            <span>Like</span>
            <span>Share</span>
          </div>
        </div>
        <section id='comment'>
          {/* Add CommentCard here to show comments */}
          <CommentCard articleId={article.id} />
        </section>
      </div>

    </article>
  );
};

export default ArticleList;
