import React from "react";

export interface PostContextProps{
  posts: Post[];
  comments: PostComment[];
  isPostsLoading: boolean;
  hasMorePosts: boolean;
  loadComments: (postIndex: number) => void;
  loadMorePosts: (startIndex: number, stopIndex: number) => void
}

export const PostContext = React.createContext<PostContextProps>({
  posts: [],
  comments: [],
  isPostsLoading: false,
  hasMorePosts: true,
  loadComments: () => {},
  loadMorePosts: () => {}
})