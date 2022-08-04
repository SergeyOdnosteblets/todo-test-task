import React, { useState, useEffect } from 'react';
import './App.css';
import { AddTodo } from './components/AddTodo/AddTodo';
import { Todo } from './components/Todo/Todo';

const getLocalStorage = () => {
  let todos = localStorage.getItem('to-do-list');

  if (todos) {
    return (todos = JSON.parse(localStorage.getItem('to-do-list')));
  } else {
    return [];
  }
};

function App() {
  const [todos, setTodos] = useState(getLocalStorage());
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    localStorage.setItem('to-do-list', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <Todo todos={todos} setTodos={setTodos} update={update} setUpdate={setUpdate} />
      <AddTodo index={0} todos={todos} setTodos={setTodos} update={update} setUpdate={setUpdate} />
    </div>
  );
}

export default App;
