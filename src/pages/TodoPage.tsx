import styles from "./styles/TodoPage.module.scss";
import { Link } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { useEffect, useState } from "react";
import { todoSelector } from "../store/todo/todo.slice";
import { themeSelector } from "../store/theme/theme.slice";
import { fetchTodos } from "../store/todo/todo.thunks";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

const TodoPage = () => {
  const dispatch = useAppDispatch();
  const {
    todoList,
    loading: todoLoading,
    error: todoError,
  } = useAppSelector(todoSelector);
  const { mode } = useAppSelector(themeSelector);
  const [doneOnly, setDoneOnly] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (todoLoading) return <Spinner />;
  if (todoError) return <Error text={todoError} />;

  return (
    <div
      className={`${styles["todo_page"]} ${
        styles[mode === "dark" ? "dark" : "light"]
      }`}
    >
      <div>
        <p>
          <button onClick={() => setDoneOnly((state) => !state)}>
            {doneOnly ? "Done" : "All"}
          </button>
          <span> Todos</span>
        </p>
        <Link to="/create">Create</Link>
      </div>

      <ul>
        {!doneOnly &&
          todoList.map(({ _uuid, title, isCompleted }) => (
            <TodoCard
              key={_uuid}
              id={_uuid}
              title={title}
              isCompleted={isCompleted}
            />
          ))}
        {doneOnly &&
          todoList
            .filter((task) => task.isCompleted)
            .map(({ _uuid, title, isCompleted }) => (
              <TodoCard
                key={_uuid}
                id={_uuid}
                title={title}
                isCompleted={isCompleted}
              />
            ))}
      </ul>
      {(!todoList.length ||
        (doneOnly && !todoList.filter((task) => task.isCompleted).length)) && (
        <p>No Todos Available!</p>
      )}
    </div>
  );
};

export default TodoPage;
