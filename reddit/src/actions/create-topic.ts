'use server'

import type { Topic } from "@prisma/client";
import { db   } from "@/db";
import { z } from 'zod';
import paths from "@/paths";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {message: "Must be loer case alphabets"}),
    description: z.string()?.min(10)
})

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[] // This is for general form erros ike not being able to save something to the db or user not being logged in.
        // The underscore is to not collide with any existing form field
    }
}

export async function createTopic(formState: CreateTopicFormState,formData: FormData) : Promise<CreateTopicFormState> {
    // If the validations pass then the valid data is  present in the result const
   
    // await new Promise(resolve => setTimeout(resolve, 2500)) // To check the loding on button ffunctionality
    const result = createTopicSchema.safeParse({ //This safeParse is the validator that the zod library returns as a result of schema creation
        name: formData.get('name'),
        description: formData.get('description')
    })
    if(!result.success) {
        console.log(result.error.flatten().fieldErrors)
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
  
    // const session = await auth();
    // if(!session || !session?.user){
    //     return {
    //         errors: {
    //             _form: ["You are not signed in!"]
    //         }
    //     }
    // }

    let topic: Topic;

    try {
        topic = await db.topic.create({
            data: {
                slug: result?.data?.name,
                description: result?.data?.description
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }
    }

    revalidatePath('/')
    redirect(paths.topicShow(topic?.slug));
} 