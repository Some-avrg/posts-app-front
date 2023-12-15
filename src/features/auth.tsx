import {AuthService} from "../shared/api.auth";
import { action, makeAutoObservable } from "mobx";

class AuthStore {   
  isAuth = false;
  isAuthInProgress = true;
  
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(data: FormData) {
    this.isAuthInProgress = true;

      await AuthService.login(data)
      .then(action('login success', resp => {
        localStorage.setItem("accessToken", resp.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        this.isAuth = true;
        this.isAuthInProgress = false; 
      }))
      .catch(action('login error', error => {
        console.log("login error");
        console.log(error);
        this.isAuthInProgress = false; 
        throw error;
      }))  
  }

  async signup(data: FormData) {
    this.isAuthInProgress = true;

    await AuthService.signup(data)
      .then(action('signup success', resp => {
        this.isAuth = true;
        this.isAuthInProgress = false; 
      }))
      .catch(action('signup error', error => {
        console.log("signup error");
        console.log(error);
        this.isAuthInProgress = false; 
        throw error;
      }))  
  }

  //получаем нoвый access token с помощью refresh token
  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) throw Error("Refresh token not found");
      const resp = await AuthService.refresh(token);
      console.log('Response while checking refresh token: ', resp.data);
      localStorage.setItem("accessToken", resp.data.accessToken);
      localStorage.setItem("refreshToken", resp.data.refreshToken);
      this.isAuth = true;

     } catch (err) {
      console.log("checkAuth error");
     } finally {
      this.isAuthInProgress = false;
    } 
  }


}

const authStore: AuthStore = new AuthStore();

export {authStore}