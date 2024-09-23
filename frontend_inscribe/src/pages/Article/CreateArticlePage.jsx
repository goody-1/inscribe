import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/User/UserContext';
import TextEditor from './Editor';

const CreateArticle = () => {
  const { user, logout } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleContentChange = (value) => {
    setContent(value); // Update content when user edits the editor
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strip HTML tags to get the actual content inside the editor
    const plainTextContent = stripHtml(content);

    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      // Decode and check the token's expiration
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= exp * 1000) {
        logout(); // Log out if the token is expired
      }
    }

    console.log(title, '-', content);
    if (!title.trim() || !plainTextContent.trim()) {
      alert('Title and content are required.');
      return;
    }

    // Post the article
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
    await axios.post('http://localhost:8000/api/articles/', {
      title,
      content
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Article posted successfully:', response.data);
      // Redirect to the article page or another relevant page
      navigate('/articles');
    })
    .catch(error => {
      console.error('Error posting article:', error.response ? error.response.data : error.message);
    });
  };

  return (
    <div className="create-article-page container flex flex-col mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4 text-yellow-500 place-self-center">
        Forget the noise, be inspired and inscribe
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter your article title"
            required
          />
        </div>

        <div id="editor" className="mb-4">
          <label htmlFor="content" className="block font-medium text-gray-700">Content</label>
          <TextEditor
            value={content} // Pass content to the TextEditor
            onChange={handleContentChange} // Handle content changes
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white font-bold py-1 px-4 rounded hover:bg-yellow-600"
        >
          Post Article
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
