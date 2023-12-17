import React from "react";

export interface PostContextProps{
  posts: Post[];
  comments: PostComment[];
  isPostsLoading: boolean;
  hasMorePosts: boolean;
  loadComments: (postIndex: number) => Promise<void>;
  loadMorePosts: (startIndex: number, stopIndex: number) => Promise<void>
}

export const PostContext = React.createContext<PostContextProps>({
  posts: [],
  comments: [],
  isPostsLoading: false,
  hasMorePosts: true,
  loadComments: () => new Promise<void>(() => {}),
  loadMorePosts: () => new Promise<void>(() => {}),
})