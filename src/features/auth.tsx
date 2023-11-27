import {AuthService} from "../shared/api.auth";
import { action, makeAutoObservable } from "mobx";

class AuthStore {   
  isAuth = false;
  isAuthInProgress = false;
  
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(data: FormData) {
    this.isAuthInProgress = true;

      await AuthService.login(data)
      .then(action('login success', resp => {
        localStorage.setItem("accessToken", resp.data.accessToken);
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

  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.refresh();
      localStorage.setItem("accessToken", resp.data.accessToken);
      this.isAuth = true;

     } catch (err) {
      console.log("auth error");
     } finally {
      this.isAuthInProgress = false;
    } 
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("accessToken");
    } catch (err) {
      console.log("logout error");
    } finally {
      this.isAuthInProgress = false;
    } 
  }
  
}

const authStore: AuthStore = new AuthStore();

export {authStore}