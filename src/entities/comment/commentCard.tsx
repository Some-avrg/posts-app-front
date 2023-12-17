import { usePost } from "../../features/PostsContext";
import { Card } from "antd";

const Comment = (props: any) => {
  const { comments } = usePost();
  const index: any = props.index;
  const id: string = "post" + index.toString();
  return (
    <Card title={comments[index].name} bordered={true} size="small" style={{ width: 400 }} id={id}>
      <p>{comments[index].body}</p>
    </Card>
  );
};
export { Comment };