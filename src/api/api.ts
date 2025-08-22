import axios from "axios";
import { UserType } from "../types/types";


export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "340cb6e2-3b17-40cb-ba1a-6b204d671b35",
  },
});

export type ResponseType<D = {}, RC = ResultCodesEnum> ={
  data: D
  messages: Array<string>
  resultCode: RC
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}


export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}


