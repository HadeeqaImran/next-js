const paths = {
    home() {
        return '/';
    },
    topicShow(slug: string) {
        return `/topics/${slug}`;
    },
    postCreate(slug: string) {
        return `/topics/${slug}/posts/new`;
    },
    postShow(topicSlug: string, postId: string) {
        return `/topics/${topicSlug}/posts/${postId}`;
    }
}

export default paths