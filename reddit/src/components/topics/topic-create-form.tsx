'use client'

import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Form
} from '@nextui-org/react';
import * as actions from '@/actions'
import { startTransition, useActionState } from 'react';

export default function TopicCreateForm() {
    const [formState, action, isPending] = useActionState(actions.createTopic, { errors: {} })
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        startTransition(() => action(formData))
    }

    return (
    <Popover placement='left'>
        <PopoverTrigger>
            <Button color="primary">Create a Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
            <Form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 p-4 w-80'>
                    <h3 className='text-lg'>Create a Topic</h3>
                    <Input name="name" label="Name" labelPlacement='outside' placeholder='Name' isInvalid={!!formState?.errors?.name}
                        errorMessage={formState?.errors?.name?.join(", ")}/>
                    <Textarea name="description" label="Description" labelPlacement='outside' placeholder='Describe your topic'
                        isInvalid={!!formState?.errors?.description}
                        errorMessage={formState?.errors?.description?.join(", ")} />
                    {formState?.errors?._form ? <div className='p-2 bg-red-200 border border-red-400 rounded'>{formState?.errors?._form?.join(', ')}</div> : null}
                    <Button isLoading={isPending} type="submit">Submit</Button>
                </div>
            </Form>
        </PopoverContent>
    </Popover>
    )
}