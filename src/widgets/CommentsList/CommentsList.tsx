import { useEffect, useState } from "react";
import { usePost } from "../../features/PostsContext";
import { VariableSizeList as List } from "react-window";
import { Comment } from "../../entities/comment/commentCard";

const CommentsList = (props: any) => {
  const postId = props.postId;
  const { comments, loadComments } = usePost();
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    (async () => {
      await loadComments(postId);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCommentsCount(comments.length);
    console.log("commentsCount = ", commentsCount);
    // eslint-disable-next-line
  }, [comments]);

  console.log("Comments = ", comments);

  // const isItemLoaded = (index: any) => {
  //   return index < comments.length && comments[index] !== null;
  // };

  const Row = ({ index, style }: { index: any; style: any }) => {
    let content;
    if (!comments[index]) {
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
      width={450}
      height={600}
      itemCount={commentsCount}
      itemSize={getItemSize}
      itemData={comments}
    >
      {Row}
    </List>
  );
};

export { CommentsList };
