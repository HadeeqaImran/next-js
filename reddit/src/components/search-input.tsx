'use client'
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export function SearchInput() {
    const searchParams = useSearchParams();

    return (
        <form action={actions.search}>
         <Input name="term" defaultValue={searchParams?.get('term') || ""}/>
         <button type="submit" style={{ display: 'none' }}></button>
        </form>
    )
}