import styles from "./styles/createPage.module.scss";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { themeSelector } from "../store/theme/theme.slice";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addTodoRequest } from "../store/todo/todo.thunks";

const CreatePage = () => {
  const navigate = useNavigate();
  const todoRef = useRef<HTMLInputElement>(null);
  const { mode } = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      title: todoRef.current?.value ?? "",
      isCompleted: false,
    };

    dispatch(addTodoRequest(newTodo));
    navigate("/");
  };

  return (
    <form
      className={`${styles["create_page"]} ${
        styles[mode === "dark" ? "dark" : "light"]
      }`}
      onSubmit={onSubmit}
    >
      <h1>Create Page</h1>
      <div>
        <input type="text" placeholder="todo" ref={todoRef} />
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreatePage;
