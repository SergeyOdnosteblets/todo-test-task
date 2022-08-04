import React, { useState } from 'react';

export const AddTodo = ({ todos, setTodos, index, update, setUpdate }) => {
  const [value, setValue] = useState('');

  const addTodoRecursive = (todos, index, value) => {
    todos.map((item) => {
      if (item.id === index) {
        const newTodo = [
          ...item.children,
          {
            id: Math.random().toString(36).substring(2, 9),
            title: value,
            parentID: item.id,
            subList: false,
            children: [],
          },
        ];
        item.children = newTodo;
      } else {
        addTodoRecursive(item.children, index, value);
      }
    });
    setValue('');
    setTodos(todos);
    setUpdate(!update);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value !== '') {
          if (index === 0) {
            setTodos([
              ...todos,
              {
                id: Math.random().toString(36).substring(2, 9),
                title: value,
                parentID: index,
                subList: false,
                children: [],
              },
            ]);
            setValue('');
          } else {
            addTodoRecursive(todos, index, value);
          }
        }
      }}>
      <input
        type="text"
        placeholder="Todo name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};
