import instance from "../axios";

export const postsApi = {
    fetchPosts() {
        return instance.get('/posts');
    },
    fetchTags() {
        return instance.get('/tags');
    },
    removePost(id) {
        return instance.delete(`/posts/${id}`);
    },
    fetchPostOne(id) {
        return instance.get(`/posts/${id}`);
    }
};
