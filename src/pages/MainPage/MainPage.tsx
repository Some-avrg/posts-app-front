import styles from "./MainPage.module.css"
import { PostsList } from "../../widgets/PostsList/PostsList";

const Main = () => {

  return (
    <div>
      <div className={styles.list}>
        <PostsList />
      </div>
    </div>
  );
};
export { Main };
