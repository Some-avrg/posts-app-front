import React from "react";
import { PostContext } from "./postContext";

interface PostProviderProps {
  children: React.ReactNode;
}

const DEFAULT_POST_LIST: Post[] = [];
const DEFAULT_COMMENT_LIST: PostComment[] = [];

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = React.useState(DEFAULT_POST_LIST);
  const [comments, setComments] = React.useState(DEFAULT_COMMENT_LIST);
  let isPostsLoading: boolean = false;

  const hasMorePosts = () => {
    if (posts.length < 111) return true;
    return false;
  };

  const loadMorePosts = (startIndex: number, stopIndex: number) => {
    return new Promise<void>((resolve) => {
      isPostsLoading = true;
      const newPosts = [...posts];

      //надо в api поместить
      for (let i = startIndex; i <= stopIndex; i += 1) {
        fetch("https://jsonplaceholder.typicode.com/posts/" + (i + 1))
          .then((response) => response.json())
          .then((json) => {
            newPosts.push(Object.assign({}, json));
          });
      }

      // fetch("https://jsonplaceholder.typicode.com/posts")
      //   .then((response) => response.json())
      //   .then((json) => {
      //     console.log("json = ", json);
      //     json.forEach((val: any) => {
      //       newPosts.push(Object.assign({}, val));
      //     });
      //   });

      setPosts(newPosts);
      isPostsLoading = false;
      console.log("loaded more items");
      resolve();
    });
  };

  const loadComments = (postIndex: number) => {
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
      });
    setComments(newComments);
    console.log("loaded comments");
  };

  //const value = React.useMemo(() => ({ posts, comments, isPostsLoading, hasMorePosts, loadMorePosts, loadComments,}), [posts]);
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