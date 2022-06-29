import instance from "../axios";

export const authApi = {
    login(params) {
        return instance.post('/auth/login', params);
    },
};
