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
    console.log("loading posts: " + startIndex + " - " + stopIndex);
    return new Promise<void>((resolve) => {
      if(stopIndex > 99){
        setHasMorePosts(false);
        stopIndex = 99;
      }
      setIsPostsLoading(true);
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
      setIsPostsLoading(false);
      //console.log("loaded posts: " + startIndex + " - " + stopIndex);
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
