import React from "react";
import styles from "./styles/Error.module.scss";

interface IError {
  text: string;
}

const Error: React.FC<IError> = ({ text }) => {
  return (
    <div className={styles.error}>
      <h1>{text}</h1>
    </div>
  );
};

export default Error;
