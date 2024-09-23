import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="text-white p-4 inline-flex justify-between w-full">
      <div>
        <Link to="/about" className="mr-4 hover:underline">About</Link>
        <Link to="/articles" className="mr-4 hover:underline">Articles</Link>
      </div>
      <div>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/signup" className="ml-4 hover:underline">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
