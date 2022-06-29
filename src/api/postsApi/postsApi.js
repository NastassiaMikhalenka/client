import instance from "../axios";

export const postsApi = {
    fetchPosts() {
        return instance.get('/posts');
    },
    fetchTags() {
        return instance.get('/tags');
    },
};
