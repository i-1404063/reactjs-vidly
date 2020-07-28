import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const MoviesNavbar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        Vidly
      </Link>
      <ul className='navbar-nav'>
        <NavLink className='nav-item nav-link' to='/movies'>
          Movies
        </NavLink>

        <NavLink className='nav-item nav-link' to='/customer'>
          Customers
        </NavLink>

        <NavLink className='nav-item nav-link' to='/rental'>
          Rentals
        </NavLink>

        {!user && (
          <React.Fragment>
            <NavLink className='nav-item nav-link' to='/loginForm'>
              Login
            </NavLink>

            <NavLink className='nav-item nav-link' to='/register'>
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink className='nav-item nav-link' to='/profile'>
              {user.name}
            </NavLink>

            <NavLink className='nav-item nav-link' to='/logout'>
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default MoviesNavbar;
