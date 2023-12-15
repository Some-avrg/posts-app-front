import { FullPost } from "../../entities/post/fullPost";
import { CommentsList } from "../../widgets/CommentsList/CommentsList";
import { Space } from "antd";
import { useLoaderData } from "react-router-dom";
import { usePost } from "../../features/PostsContext";

const PostPage = () => {
  const postId: any = useLoaderData();
  const { posts, loadMorePosts} = usePost();
  if(!posts) {
    console.log("Hm");
    loadMorePosts(0, postId);
  }
  

  return (
    <Space direction="vertical" size={16}>
      <FullPost postId={postId}/>
      <CommentsList postId={postId}/>
    </Space>
  );
};
export { PostPage };
