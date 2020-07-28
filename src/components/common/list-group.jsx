import React from 'react';

const ListGroup = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedGenre,
}) => {
  return (
    <ul className='list-group'>
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          style={{ cursor: 'pointer' }}
          className={
            item === selectedGenre
              ? 'list-group-item active clickable'
              : 'list-group-item clickable'
          }>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default ListGroup;
