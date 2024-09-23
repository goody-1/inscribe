import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-white p-4 pr-16 w-1/6 rounded-lg max-h-96 min-w-max filter drop-shadow">
      <ul>
        <li className="mb-4">
          <a href="/category/tech" className="hover:underline">Tech</a>
        </li>
        <li className="mb-4">
          <a href="/category/lifestyle" className="hover:underline">Lifestyle</a>
        </li>
        <li className="mb-4">
          <a href="/category/business" className="hover:underline">Business</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
