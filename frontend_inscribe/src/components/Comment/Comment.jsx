import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentCard = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Fetch existing comments for the article when component mounts
    axios.get(`http://localhost:8000/api/articles/${articleId}/comments/`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [articleId]);

  const handleAddComment = (e) => {
    e.preventDefault();

    // Create new comment via API
    axios.post(`http://localhost:8000/api/articles/${articleId}/comments/`, {
      content: newComment
    })
    .then(response => {
      // Add the new comment to the list
      setComments(prevComments => [...prevComments, response.data]);
      setNewComment(''); // Clear the input field
    })
    .catch(error => {
      console.error('Error adding comment:', error);
    });
  };

  return (
    <section className="comment-section mt-4 text-xs">
      <div className='flex justify-between'>
        <button
          className="text-white font-bold mb-2 bg-yellow-500 hover:bg-white hover:text-yellow-400"
          onClick={() => {setShowComments(!showComments);
            console.log(articleId);}}
        >
          {showComments ? 'Hide Comments' : 'Comment'}
        </button>

        <button
          type="submit"
          className="text-white font-bold mb-2 bg-yellow-500 hover:bg-white hover:text-yellow-400"
          >
          Add Comment
        </button>
      </div>

      {showComments && (
        <div>
          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mt-2 mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
              rows="1"
              required
            />
          </form>

          {/* Display Existing Comments */}
          <div className="comment-list space-y-2 text-white rounded-lg">
            {comments.map(comment => {
                return (
                    <div key={comment.id} className="rounded-lg bg-gray-800 p-4">
                      <div className='flex justify-between mb-3'>
                        <p className="font-semibold inline">{comment.author_username}</p>
                        <span className="text-sm text-gray-400">{comment.humanized_created_at}</span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                    )}
                )
            }
          </div>
        </div>
      )}
    </section>
  );
};

export default CommentCard;
