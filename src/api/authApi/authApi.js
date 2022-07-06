import instance from "../axios";

export const authApi = {
    login(params) {
        return instance.post('/auth/login', params);
    },
    me() {
        return instance.get('/auth/me');
    },
    register(params) {
        return instance.post('/auth/register', params);
    }
};
