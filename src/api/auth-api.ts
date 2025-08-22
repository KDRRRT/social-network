import { instance, ResponseType} from "./api.ts"





type MeResponseDataType = {
  id: number, email: string, login: string
  }
  
  type LoginResponseDataType = {
    userId:number
  }
  
  
  export const authAPI = {
    async authMe() {
      const res = await instance.get<ResponseType<MeResponseDataType>>(`auth/me`);
      return res.data;
    },
    async login(email:string, password:string, rememberMe = false, captcha: null | string = null) {
      const res = await instance.post<ResponseType<LoginResponseDataType>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      });
      return res.data;
    },
    logout() {
      return instance.delete(`auth/login`);
    },
  };