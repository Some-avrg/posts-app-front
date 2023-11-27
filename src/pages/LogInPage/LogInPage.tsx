import React from "react";
import LogInForm from "../../widgets/LogInForm/LogInForm";
import styles from "./LogInPage.module.css";

const LogInPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <p className={styles.title}>Log In</p>
      <LogInForm />
    </div>
  );
};

export { LogInPage };
