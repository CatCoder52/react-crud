import React from 'react';

const ListItem = ({ item, editTodo, deleteTodo }) => {
	return (
    <li key={item.id} className='collection-item animated bounceIn'>
      <i
        className='material-icons left green-text waves-effect'
        onClick={editTodo}
      >
        edit
      </i>

      {item.name}

      <i
        className='material-icons right red-text waves-effect'
        onClick={deleteTodo}
      >
        delete_forever
      </i>
    </li>
  );
};

export default ListItem;
