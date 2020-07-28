import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

///stateless functional component
const Pagination = ({ onPageChange, countItem, pageSize, currentPage }) => {
  const pageLength = Math.ceil(countItem / pageSize);
  if (pageLength === 1) return null;
  const pages = _.range(1, pageLength + 1);

  return (
    <nav className='page'>
      <ul className='pagination'>
        {pages.map(page => (
          <li
            key={page}
            style={{ cursor: 'pointer' }}
            className={currentPage === page ? 'page-item active' : 'page-item'}>
            <Link onClick={() => onPageChange(page)} className='page-link'>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  countItem: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
