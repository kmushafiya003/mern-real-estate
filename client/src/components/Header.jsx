import React from 'react';
import { ImSearch } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const {user } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl  mx-auto p-3">
        {/* ------------ Logo ------------- */}

        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* --------------- Search ----------------- */}
        <form className="bg-slate-100 p-3 rounded-lg flex items-center justify-between">
          <input
            type="text"
            placeholder="Search.... "
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <ImSearch className="text-slate-500" />
        </form>

        {/* -------- navlinks ------------------ */}
        <ul className="flex items-center gap-x-6">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline transition-all duration-500">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline transition-all duration-500">
              About
            </li>
          </Link>
          <Link to="/profile">
            {user.currentUser ? (
              <img src={user.currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 sm:h-9 sm:w-9 object-cover ' />
            ) : (
              <li className=" text-slate-700 hover:underline transition-all duration-500">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
