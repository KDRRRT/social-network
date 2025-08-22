import { instance } from "./api.ts";

type GetCaptchaUrlResponseDataType = {
    url: string
}


export const securityAPI = {
    async getCaptchaUrl() {
      const res = await instance.get<GetCaptchaUrlResponseDataType>(`security/get-captcha-url`);
        return res.data;
    },
  };