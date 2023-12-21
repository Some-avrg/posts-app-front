import { FullPost } from "../../entities/post/fullPost";
import { CommentsList } from "../../widgets/CommentsList/CommentsList";
import { Space } from "antd";
import { useParams } from "react-router-dom";
import { usePost } from "../../features/PostsContext";
import { useEffect } from "react";

const PostPage = () => {
  const postId = Number(useParams().postId);
  const { posts, loadMorePosts } = usePost();

  useEffect(() => {
    loadMorePosts(postId, postId).then(() => {
    });
    // eslint-disable-next-line
  }, []);

  if (!posts[0]) {
    return <div>"Loading full post"</div>;
  }

  return (
    <Space direction="vertical" size={16}>
      <FullPost postId={postId} />
      <CommentsList postId={postId} />
    </Space>
  );
};
export { PostPage };
