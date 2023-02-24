import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addTodos,
  deleteTodos,
  editTodos,
  getTodos,
} from "./features/todosSlice";

function App() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todos = useSelector((state) => state.todos);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleAdd = (text) => {
    dispatch(addTodos(text));
    setText("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodos(id));
  };

  const handleDone = (id) => {
    dispatch(editTodos(id));
  };

  return (
    <div className="App">
      <div className="form">
        <input
          type="text"
          placeholder="Введите текст"
          onChange={handleInput}
          value={text}
        />
        <button onClick={() => handleAdd(text)}>Добавить</button>
      </div>
      {todos.map((task) => {
        return (
          <div className="task-block">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleDone(task._id)}
            />
            <div className={task.done ? "task-text-done" : "task-text"}>
              {task.text}
            </div>
            <button onClick={() => handleDelete(task._id)}>❌</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
