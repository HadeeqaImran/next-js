'use server'

import type { Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '@/db';
import paths from '@/paths';

interface createPostForm {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    }
}

const createPostFormSchema = z.object({
    title: z.string().min(3).max(255),
    content: z.string().min(3).max(1000),
});

// The order of arguments is because of the way we are using the useActionState hook and bind function all while tying the action to the form action.
export async function createPost(
    slug: string,
    formState: createPostForm,
    formData: FormData,
): Promise<createPostForm> {
    const result = createPostFormSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    if(!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    const topic = await db.topic.findFirst({
        where: {
            slug,
        }
    });

    if (!topic) {
        return {
            errors: {
                _form: ['Topic not found']
            }
        }
    }

    let post: Post;
    try {
        console.log("yes 1")
        console.log("Post create data:", await db.user.findMany());
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: 'cm6g5w8a50000x6uehklmecah',
                topicId: topic.id.toString(),
            }
        });
        console.log("yes 2")
    } catch (error: unknown) {
        console.log("yes 3", error)
        if(error instanceof Error) {
        return {
            errors: {
                _form: [error.message]
            }
        }
        } else {
            return {
                errors: {
                    _form: ["Failed to create post"]
                }
            }
        }
    }

    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
    // homePage - you can use time based caching because data can be changing in the background but you do not need to re fetch Data again and again
    // revaidate topicShow - when a user creates a post they expect to see it so we can forcefully revalidate.
}