import axiosInstance from '../http-common';
import TokenService from "@/services/token.service";
const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
           // console.log("token ===================> "+ token)
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
           return  Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        (res)=>{
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (originalConfig.url !== "/api/auth/signin" && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axiosInstance.post("/api/auth/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken()
                        });

                        const {token} = rs.data;
                        //console.log("token ============&&&&&=======> "+ token)

                        store.dispatch("auth/refreshToken", token);
                        TokenService.updateLocalAccessToken(token);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
}
export default setup;