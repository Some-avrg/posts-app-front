import { instance } from "./api.config";

const DataService = {
  loadAllPosts() {
    const response = instance.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  },

  load1Post(index: any) {
    const response = instance.get(
      "https://jsonplaceholder.typicode.com/posts/" + index,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  },

  loadAllComments(index: any) {
    return instance.get(
      "https://jsonplaceholder.typicode.com/posts/" + index + "/comments",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};

export { DataService };
