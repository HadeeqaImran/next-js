 'use client'

 import { startTransition, useActionState } from "react"
 import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions'

 export default function PostCreateForm({slug}: {slug: string}) {
    const [formState, action, isPending] = useActionState(
        actions.createPost.bind(null, slug),
        { errors: {} })

   // previously if we wanted our server action to get called with some additional arguments, we used the bind function. But now we will use that inside the useActionState
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        startTransition(() => action(formData))
    }
    
    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color="primary">
                    Create a Post
                </Button>
            </PopoverTrigger>
            <PopoverContent >
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Post</h3>
                        <Input name="title" label="Title" labelPlacement="outside" placeholder="Title" isInvalid={!!formState?.errors?.title} errorMessage={formState?.errors?.title?.join(", ")}/>
                        <Textarea name="content" label="Content" labelPlacement="outside" placeholder="Content" isInvalid={!!formState?.errors?.content} errorMessage={formState?.errors?.content?.join(", ")}/>

                        <Button type={'submit'} isLoading={isPending}>Create Post</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
 }