import { usePost } from "../../features/PostsContext";
import { Card } from "antd";

const FullPost = (props: any) => {
  const { posts } = usePost();
  const index: any = props.postId;
  console.log("index = ", index);
  console.log("posts = ", posts);
  console.log("posts[index] = ", posts[index]);
  console.log("posts[index].userId = ", posts[index].userId);
  return (
    <Card title={posts[index].userId} bordered={true} style={{ width: 500 }}>
      <h3>{posts[index].title}</h3>
      <p>{posts[index].body}</p>
    </Card>
  );
};
export { FullPost };
