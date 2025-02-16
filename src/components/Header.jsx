import React from 'react';

function Header({ isSignIn }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">InsightStocks</div>
        <nav>
          {isSignIn ? ( // Conditional rendering
            null
          ) : <ul>
          <li>
            <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Sign In
            </a>
          </li>
        </ul>}
        </nav>
      </div>
    </header>
  );
}

export default Header;
