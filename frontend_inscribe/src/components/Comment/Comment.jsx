import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../User/UserContext';
import axios from 'axios';

const CommentCard = ({ articleId, isOpen, toggleComments }) => {
  const { logout } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

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

  const isTokenExpired = () => {
    if (!token) return true;
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= exp * 1000;
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!token || isTokenExpired()) {
      logout(); // Log out if the token is expired or missing
      navigate('/login'); // Redirect to login
      return;
    }

    if (!newComment.trim()) {
      alert('Comment cannot be empty.');
      return;
    }

    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];

    axios.post(`http://localhost:8000/api/articles/${articleId}/comments/`, {
      content: newComment
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setComments(prevComments => [...prevComments, response.data]);
      setNewComment(''); // Clear the input field
    })
    .catch(error => {
      console.error('Error adding comment:', error.response ? error.response.data : error.message);
      alert('Failed to add comment. Please ensure you are logged in.'); // User feedback
    });
  };

  return (
    <section className="comment-section mt-4 text-xs">
      <div className='flex justify-between'>
        <button
          className="text-white font-bold mb-2 bg-yellow-500 hover:bg-white hover:text-yellow-400"
          onClick={() => toggleComments(articleId)}
        >
          {showComments ? 'Hide Comments' : 'Comment'}
        </button>

        <button
          type="submit"
          className="text-white font-bold mb-2 bg-yellow-500 hover:bg-white hover:text-yellow-400"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>

      {isOpen && (
        <div>
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

          <div className="comment-list space-y-2 text-white rounded-lg">
            {comments.map(comment => (
              <div key={comment.id} className="rounded-lg bg-gray-800 p-4">
                <div className='flex justify-between mb-3'>
                  <p className="font-semibold inline">{comment.author_username}</p>
                  <span className="text-sm text-gray-400">{comment.humanized_created_at}</span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CommentCard;
