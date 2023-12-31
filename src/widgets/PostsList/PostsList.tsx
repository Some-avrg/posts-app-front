import { useEffect, useRef, useState } from "react";
import { usePost } from "../../features/PostsContext";
import { VariableSizeList as List } from "react-window";
import { PostCard } from "../../entities/post/postCard";
import { getCountOfLines } from "../../shared/usefulFunctions";
import InfiniteLoader from "react-window-infinite-loader";

const PostsList: React.FC = () => {
  const { posts, isPostsLoading, loadMorePosts, hasMorePosts } = usePost();
  const [postCount, setPostCount] = useState(posts.length);

  let listRef = useRef<List | null>(null);

  const isItemLoaded = (index: any) => {
    return !hasMorePosts || index < posts.length;
  };
  useEffect(() => {
    setPostCount(hasMorePosts ? posts.length + 1 : posts.length);
    // eslint-disable-next-line
  }, [posts]);

  // загружаем только одну порцию постов за раз
  // передаём пустой callback в InfiniteLoader если он попросит нас загрузить посты несколько раз
  const loadMoreItems = isPostsLoading ? () => {} : loadMorePosts;

  const Row = ({ index, style }: { index: any; style: any }) => {
    let content;

    if (!isItemLoaded(index)) {
      content = "Loading...";
      //пересчитываем размер элемента после загрузки
      setTimeout(() => {
        if (listRef?.current) {
          listRef.current.resetAfterIndex(index);
        }
      }, 200);
    } else {
      content = <PostCard index={index} />;
    }
    return <div style={style}>{content}</div>;
  };

  const getItemSize = (index: any) => {
    //т.к. лист запрашивает размер строки до того, как загрузить её, то отправляем ему дефолтное значение
    if (posts[index] === undefined) return 155;
    //а потом пересчитываем
    return 133 + 22 * getCountOfLines(posts[index].title.toString());
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={postCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          width={700}
          height={700}
          itemCount={postCount}
          itemSize={getItemSize}
          estimatedItemSize={155}
          onItemsRendered={onItemsRendered}
          ref={(list) => {
            // Передаём List ref в InfiniteLoader
            ref(list);
            // и сохраняем копию для себя
            listRef.current = list;
          }}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};

export { PostsList };
