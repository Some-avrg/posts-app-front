import { usePost } from "../../features/PostsContext";
import { Card } from "antd";

const FullPost = (props: any) => {
  const { posts } = usePost();
  const postId: any = props.postId;
  console.log("postId = ", postId);
  console.log("posts = ", posts);
  console.log("posts[0] = ", posts[0]);
  console.log("posts[0].userId = ", posts[0].userId);
  return (
    <Card title={posts[0].userId} bordered={true} style={{ width: 500 }}>
      <h3>{posts[0].title}</h3>
      <p>{posts[0].body}</p>
    </Card>
  );
};
export { FullPost };
