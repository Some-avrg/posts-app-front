import { useEffect, useState } from "react";
import { usePost } from "../../features/PostsContext";
import { VariableSizeList as List } from "react-window";
import { Comment } from "../../entities/comment/commentCard";

const CommentsList = (props: any) => {
  const postId = props.postId;
  const { comments, loadComments } = usePost();
  const [commentsCount, setCommentsCount] = useState(comments.length);

  useEffect(() => {
    console.log("loading comments");
    loadComments(postId);
    //ждём пока не придут комменты с бэка, затем считаем длину списка
    setTimeout(() => {
      setCommentsCount(comments.length);
    }, 100);
  }, []);

   console.log("Comments = ", comments);
   console.log("Comments length", comments.length);

  const isItemLoaded = (index: any) => {
    return index < comments.length && comments[index] !== null;
  };

  const Row = ({ index, style }: { index: any; style: any }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = <Comment index={index} />;
    }
    return <div style={style}>{content}</div>;
  };

  const getItemSize = (index: any) => {
    return 155;
  };

  return (
    <List
      width={400}
      height={700}
      itemCount={commentsCount}
      itemSize={getItemSize}
    >
      {Row}
    </List>
  );
};

export { CommentsList };
