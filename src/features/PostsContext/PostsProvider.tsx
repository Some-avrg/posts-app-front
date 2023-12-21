import React from "react";
import { PostContext } from "./postContext";
import { DataService } from "../../shared/api.data";

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
    return new Promise<void>(async (resolve) => {
      if (stopIndex > 99) {
        setHasMorePosts(false);
        stopIndex = 99;
      }
      setIsPostsLoading(true);
      try {
        const newPosts = [...posts];
        const resp = await DataService.load1Post(startIndex + 1);
        newPosts.push(resp.data);
        setPosts(newPosts);
        setIsPostsLoading(false);
        resolve();
      } catch (error) {
        console.log("error while getting post: ", error);
      }
    });
  };

  const loadComments = (postIndex: number) => {
    return new Promise<void>(async (resolve) => {
      const newComments = [...comments];
      
      try{
        const resp = await DataService.loadAllComments(postIndex);
        resp.data.forEach((val: any) => {
          newComments.push(val);
        })
        setComments(newComments);
        resolve();
      }
      catch(error){
        console.log("error while loading comments: ", error);
      }
    });
  };

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
