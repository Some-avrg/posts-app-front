import React from "react";
import { PostContext } from "./postContext";

export const usePost = () => React.useContext(PostContext); 