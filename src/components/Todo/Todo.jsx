import React from 'react';
import { AddTodo } from '../AddTodo/AddTodo';
import styles from './Todo.module.scss';

export const Todo = ({ todos, setTodos, update, setUpdate }) => {
  const todoRecursive = ({ item, todos, setTodos, update, setUpdate }) => {
    return (
      <div>
        <div>{item.title}</div>
        <div style={{ margin: '5px 25px' }}>
          {item.children &&
            item.children.map((item, index) => {
              return (
                <div key={index} className={styles.list}>
                  {todoRecursive({ item, todos, setTodos, update, setUpdate })}
                  {item.subList ? (
                    <>
                      <AddTodo
                        index={item.id}
                        todos={todos}
                        setTodos={setTodos}
                        update={update}
                        setUpdate={setUpdate}
                      />
                      {item.parentID !== 0 && (
                        <button onClick={() => delSublist(item.parentID, todos)}>
                          Remove Sublist
                        </button>
                      )}
                    </>
                  ) : (
                    <button onClick={() => subList(item.id, todos)}>Add Sublist</button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const upTodo = (id) => {
    const index = todos.findIndex((item) => {
      return item.id === id;
    });

    [todos[index], todos[index - 1]] = [todos[index - 1], todos[index]];
    setTodos(todos);
    setUpdate(!update);
  };

  const downTodo = (id) => {
    const index = todos.findIndex((item) => {
      return item.id === id;
    });

    [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];
    setTodos(todos);
    setUpdate(!update);
  };

  const removeTodo = (id) => {
    let newTodo = [...todos].filter((item) => item.id !== id);
    setTodos(newTodo);
  };

  const subList = (id, todos) => {
    const newTodo = todos.map((item) => {
      if (item.id === id) {
        item.subList = !item.subList;
      } else {
        item.children && subList(id, item.children);
      }
      return item;
    });
    setTodos(newTodo);
  };

  const delSublist = (id, todos) => {
    const newTodo = todos.map((item) => {
      if (item.id !== id) {
        item.children = [];
      } else {
        item.children && delSublist(id, item.children);
      }
      return item;
    });
    setTodos(newTodo);
  };

  return (
    <div>
      {todos.map((item, index) => {
        return (
          <div key={index} className={styles.list}>
            {todoRecursive({ item, todos, setTodos, update, setUpdate })}
            <div>
              <div className={styles.buttons}>
                <button onClick={() => removeTodo(item.id)}>Remove</button>
                {item.id === todos[0].id && todos.length > 1 ? (
                  <div>
                    <button onClick={() => downTodo(item.id)}>down</button>
                  </div>
                ) : item.id === todos[todos.length - 1].id && todos.length > 1 ? (
                  <div>
                    <button onClick={() => upTodo(item.id)}>up</button>
                  </div>
                ) : todos.length > 1 ? (
                  <div>
                    <button onClick={() => upTodo(item.id)}>up</button>
                    <button onClick={() => downTodo(item.id)}>down</button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {item.subList ? (
                <AddTodo
                  index={item.id}
                  todos={todos}
                  setTodos={setTodos}
                  update={update}
                  setUpdate={setUpdate}
                />
              ) : (
                <div>
                  <button onClick={() => subList(item.id, todos)}>Add Sublist</button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
