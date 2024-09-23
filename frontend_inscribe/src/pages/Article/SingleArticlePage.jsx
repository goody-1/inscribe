import React from 'react';
import { useParams } from 'react-router-dom';
// import CommentList from '../../components/Comment/CommentList';
// import CommentForm from '../../components/Comment/CommentForm';

const ArticleDetailPage = () => {
  const { id } = useParams(); // get article ID from URL params

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <article>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Article Title {id}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {/* Placeholder for the article content */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
            libero eget velit efficitur convallis.
          </p>
        </article>

        {/* Comments Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
          {/* <CommentList articleId={id} />
          <CommentForm articleId={id} /> */}
        </section>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
