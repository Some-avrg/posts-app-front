import { Link } from "react-router-dom";
import { usePost } from "../../features/PostsContext";
import { Card } from "antd";

const PostCard = (props: any) => {
  const { posts } = usePost();
  const index: any = props.index;
  const id: string = "post" + index.toString();
  if(posts[index] === undefined) return <div>Well...</div>;
  return (
    <Card title={posts[index].userId} bordered={true} extra={<Link to={"post/" + posts[index].id.toString()} >Read</Link>} style={{ width: 500 }} id={id}>
      <p>{posts[index].title}</p>
    </Card>
  );
};
export { PostCard };
