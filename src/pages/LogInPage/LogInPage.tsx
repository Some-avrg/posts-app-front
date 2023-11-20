import React from "react";
import LogInForm from "../../shared/LogInForm/LogInForm";
import styles from "./LogInPage.module.css";

const LogInPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <LogInForm />
    </div>
  );
};

export { LogInPage };
