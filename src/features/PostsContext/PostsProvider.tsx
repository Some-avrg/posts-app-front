import React from "react";
import { PostContext } from "./postContext";

interface PostProviderProps {
  children: React.ReactNode;
}

const DEFAULT_POST_LIST: Post[] = [];
const DEFAULT_COMMENT_LIST: PostComment[] = [];

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = React.useState(DEFAULT_POST_LIST);
  const [hasMorePosts, setHasMorePosts] = React.useState(true);
  const [isPostsLoading, setIsPostsLoading] = React.useState(false);
  const [comments, setComments] = React.useState(DEFAULT_COMMENT_LIST);

  const loadMorePosts = (startIndex: number, stopIndex: number) => {
    return new Promise<void>((resolve) => {
      if (stopIndex > 99) {
        setHasMorePosts(false);
        stopIndex = 99;
      }
      setIsPostsLoading(true);

      const newPosts = [...posts];
      //надо в api поместить
      fetch(
        "https://jsonplaceholder.typicode.com/posts/" +
          (startIndex + 1).toString()
      )
        .then((response) => response.json())
        .then((json) => {
          newPosts.push(Object.assign({}, json));
          setPosts(newPosts);
          setIsPostsLoading(false);
          console.log("loaded post");
          resolve();
        });
    });
  };

  const loadComments = (postIndex: number) => {
    return new Promise<void>((resolve) => {
      const newComments: PostComment[] = [];
      setComments(newComments);
      fetch(
        "https://jsonplaceholder.typicode.com/posts/" +
          postIndex.toString() +
          "/comments"
      )
        .then((response) => response.json())
        .then((json) => {
          json.forEach((val: any) => {
            newComments.push(Object.assign({}, val));
          });
          setComments(newComments);
          console.log("loaded comments");
          resolve();
        });
    });
  };

  // const value = React.useMemo(
  //   () => ({
  //     posts,
  //     comments,
  //     isPostsLoading,
  //     hasMorePosts,
  //     loadMorePosts,
  //     loadComments,
  //   }),
  //   [posts, comments, isPostsLoading, hasMorePosts, loadMorePosts, loadComments]
  // );

  const value = {
    posts,
    comments,
    isPostsLoading,
    hasMorePosts,
    loadMorePosts,
    loadComments,
  };

  return (
    <PostContext.Provider value={value}> {children} </PostContext.Provider>
  );
};
