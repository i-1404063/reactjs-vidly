import React from 'react';

const Search = ({ value, onChange }) => {
  return (
    <input
      type='search'
      name='query'
      placeholder='Search...'
      className='form-control my-3'
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
