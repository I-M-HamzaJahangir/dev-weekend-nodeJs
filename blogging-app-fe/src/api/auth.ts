import { request } from "./client";
import type { User } from "../types";

export interface SignupPayload {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const signup = (payload: SignupPayload) =>
  request<{ msg: string }>("/user/signup", { method: "POST", body: payload });

export const login = (payload: LoginPayload) =>
  request<{ msg: string }>("/user/login", { method: "POST", body: payload });

export const logout = () => request<{ msg: string }>("/user/logout", { method: "POST" });

export const fetchMe = () => request<{ data: User }>("/user/me");
