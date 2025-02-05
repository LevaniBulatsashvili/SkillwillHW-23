import React from "react";
import {
  finishTodoRequest,
  deleteTodoRequest,
} from "../store/todo/todo.thunks";
import styles from "./styles/TodoCard.module.scss";
import { AppDispatch } from "../store";
import useAppDispatch from "../hooks/useAppDispatch";

interface ITodoCard {
  id: string;
  title: string;
  isCompleted: boolean;
}

const TodoCard: React.FC<ITodoCard> = ({ id, title, isCompleted }) => {
  const dispatch = useAppDispatch<AppDispatch>();

  const onFinishTodo = () => dispatch(finishTodoRequest(id));
  const ondeleteTodo = () => dispatch(deleteTodoRequest(id));

  return (
    <li
      className={`${styles["todo_card"]} ${styles[isCompleted ? "done" : ""]}`}
    >
      <h3>{title}</h3>
      <div>
        {!isCompleted && (
          <button onClick={onFinishTodo}>
            <span className="material-symbols-outlined">check</span>
          </button>
        )}
        <button onClick={ondeleteTodo}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </li>
  );
};

export default TodoCard;
