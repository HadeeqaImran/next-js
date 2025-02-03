'use server'

import { redirect } from 'next/navigation'

export async function search(formData: FormData) {
    console.log("check")
    const term = formData.get('term') as string
    console.log("term", term)
    if (typeof term !== 'string' || !term) {
        redirect('/')
    }

    redirect(`/search?term=${term}`)
}
