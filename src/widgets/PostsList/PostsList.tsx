import { useEffect, useState } from "react";
import { usePost } from "../../features/PostsContext";
import { VariableSizeList as List } from "react-window";
import { PostCard } from "../../entities/post/postCard";
import { getCountOfLines } from "../../shared/usefulFunctions";
import InfiniteLoader from "react-window-infinite-loader";

const PostsList = () => {
  const { posts, isPostsLoading, loadMorePosts, hasMorePosts } = usePost();
  const [postCount, setPostCount] = useState(posts.length);

  //сделать для постоянного postCount!!!!!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    console.log("Effect!!!!");
    if (hasMorePosts()) {
      setPostCount(hasMorePosts() ? posts.length + 1 : posts.length);
    }
  }, [posts]);

  const isItemLoaded = (index: any) => {
    // if (hasMorePosts()) {
    //   setPostCount(hasMorePosts() ? posts.length + 1 : posts.length);
    // }
    return posts[index] !== undefined;
  };
  // const isItemLoaded = (index: any) => false;

  // загружаем только одну порцию постов за раз
  // передаём пустой callback в InfiniteLoader если он попросит нас загрузить посты несколько раз
  const loadMoreItems = isPostsLoading ? () => {} : loadMorePosts;

  const Row = ({ index, style }: { index: any; style: any }) => {
    let content;
    //console.log("isItemLoaded(" + index + ") = ", isItemLoaded(index));
    if (posts[index] === undefined) {
      content = "Loading...";
    } else {
      content = <PostCard index={index} />;
    }
    return <div style={style}>{content}</div>;
  };

  const getItemSize = (index: any) => {
    //return 133 + 22 * getCountOfLines(posts[index].title.toString());
    return 155;
  };

  //if (!posts[0]) return <div>Loading...</div>;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={postCount}
      loadMoreItems={loadMoreItems}
      threshold={1}
      minimumBatchSize={1}
    >
      {({ onItemsRendered, ref }) => (
        <List
          width={700}
          height={700}
          itemCount={postCount}
          itemSize={getItemSize}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};

export { PostsList };
