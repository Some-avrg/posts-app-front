import React from "react";
import SignUpForm from "../../widgets/SignUpForm/SignUpForm";
import styles from "./SignUpPage.module.css";

const SignUpPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <p className={styles.title}>Sign Up</p>
      <SignUpForm />
    </div>
  );
};

export { SignUpPage };
