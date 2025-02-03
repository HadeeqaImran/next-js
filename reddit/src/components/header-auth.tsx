'use client'

import {
    Avatar,
    Button,
    NavbarItem,
    Popover,
    PopoverTrigger,
    PopoverContent
}
from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import * as actions from '@/actions'

export default function HeaderAuth() {
    const session = useSession();

    let authContent: React.ReactNode;
    if (session?.status === 'loading') {
        // To handle the time when we have not yet fetched the sign in status
        authContent = null;
    } else if (session?.data?.user) {
        authContent = // To make the error of possiblity of undefined image to go away
        <Popover placement='left'>
            <PopoverTrigger>
                <Avatar src={session?.data?.user?.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <div className='p-4'>
                    <form action={actions.signOut}>
                        <Button type="submit">Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    } else {
        authContent = <>
            <NavbarItem>
                <form action={actions.signInWithGitHub}>
                    <Button type='submit' color='secondary' variant='bordered'>
                        Sign In
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signInWithGitHub}>
                    <Button type='submit' color='primary' variant='flat'>
                        Sign Out
                    </Button>
                </form>
            </NavbarItem>
        </>
    }
    return (
        authContent
    );
}