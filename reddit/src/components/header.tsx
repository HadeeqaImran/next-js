import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
}
from '@nextui-org/react'
import HeaderAuth from './header-auth';
import { SessionProvider } from 'next-auth/react';
import { SearchInput } from '@/components/search-input';
import { Suspense } from 'react';
export default async function Header() {
    // This accesses cookies and therefore using it here and then keeping it in the layout file is making every page dynamic
    // const session = await auth();

    return (
    
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href="/" className='font-bold'>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem>
                    <Suspense>
                    <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
            {/* By doing this no wwe are figuring out authenticatio stuff in the browser, the next server does not have to make this a dynamic route */}
            <SessionProvider>
                <HeaderAuth />
            </SessionProvider>
            </NavbarContent>
        </Navbar>
    );
}