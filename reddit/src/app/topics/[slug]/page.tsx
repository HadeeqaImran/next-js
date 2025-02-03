import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/post";
import { Suspense } from "react";

interface TopicShowPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function TopicShowPage ({ params }: TopicShowPageProps) {
    const { slug } = await params;
    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="col-span-3 font-bold">
                {slug}
            </h1>
            <Suspense>
                <PostList fetchPosts={() => fetchPostsByTopicSlug(slug)}/>
            </Suspense>
        </div>
        <div>
            <PostCreateForm slug={slug}/>
        </div>
    </div>
}