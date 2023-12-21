import { usePost } from "../../features/PostsContext";
import { Card } from "antd";

const FullPost = (props: any) => {
  const { posts } = usePost();
  const postId: any = props.postId;
  console.log("postId = ", postId);

  return (
    <Card title={posts[0].userId} bordered={true} style={{ width: 500 }}>
      <h3>{posts[0].title}</h3>
      <p>{posts[0].body}</p>
    </Card>
  );
};
export { FullPost };
