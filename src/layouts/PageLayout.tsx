import styles from "./styles/PageLayout.module.scss";
import { themeSelector } from "../store/theme/theme.slice";
import React, { ReactNode } from "react";
import useAppSelector from "../hooks/useAppSelector";

interface IPageLayout {
  children: ReactNode;
}

const PageLayout: React.FC<IPageLayout> = ({ children }) => {
  const { mode } = useAppSelector(themeSelector);

  return (
    <div
      className={`${styles["page_layout"]} ${
        styles[mode === "dark" ? "dark" : "light"]
      }`}
    >
      {children}
    </div>
  );
};

export default PageLayout;
