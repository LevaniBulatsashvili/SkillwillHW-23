import { Link } from "react-router-dom";
import styles from "./styles/Header.module.scss";
import { themeSelector, toggleTheme } from "../store/theme/theme.slice";
import { AppDispatch } from "../store";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

const Header = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const { mode } = useAppSelector(themeSelector);

  return (
    <header className={styles["header"]}>
      <Link to="/">TodoApp</Link>
      <button
        onClick={() => dispatch(toggleTheme())}
        className={styles[mode === "dark" ? "dark" : "light"]}
      >
        <span className="material-symbols-outlined">light_mode</span>
      </button>
    </header>
  );
};

export default Header;
