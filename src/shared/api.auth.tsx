import { instance } from "./api.config";

// function getCookie(key: String) {
//   const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
//   return b ? b.pop() : "";
// }

const AuthService = {
  login(data: FormData) {
    const response = instance.post("api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  },

  signup(data: FormData) {
    return instance.post("api/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  refresh(token: string) {
    return instance.post("/api/refreshToken", JSON.stringify({refreshToken: token}), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  logout() {
    return instance.post("/api/logout");
  },
};

export { AuthService };
