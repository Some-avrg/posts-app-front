import axios from "axios";

export const instance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  //console.log('Starting Request', JSON.stringify(config, null, 2));
  return config;
});

instance.interceptors.response.use(
  // в случае валидного accessToken ничего не делаем:
  (config) => {
    return config;
  },
  // в случае просроченного accessToken пытаемся его обновить:
  async (error) => {
    // предотвращаем зацикленный запрос, добавляя свойство _isRetry
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (
      // проверим, что ошибка именно из-за невалидного accessToken
      error.response.status === 401 &&
      // проверим, что запрос не повторный
      error.config &&
      !error.config._isRetry
    ) {
      try {
        // запрос на обновление токенов
        const token = localStorage.getItem("refreshToken");
        if (!token) throw Error("Refresh token not found");
        const resp = await instance.post("/api/refreshToken", token);
        // сохраняем новый accessToken в localStorage
        localStorage.setItem("accessToken", resp.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        // переотправляем запрос с обновленным accessToken
        return instance.request(originalRequest);
      } catch (error) {
        console.log("AUTH ERROR", error);
      }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку
    throw error;
  }
);
