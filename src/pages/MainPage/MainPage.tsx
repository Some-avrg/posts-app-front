import styles from "./MainPage.module.css";
import { PostsList } from "../../widgets/PostsList/PostsList";

const Main = () => {
  return (
    <div className={styles.list}>
      <PostsList />
    </div>
  );
};
export { Main };
