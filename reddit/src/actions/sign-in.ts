'use server'

import { signIn } from "@/auth";

export async function signInWithGitHub() {
    return await signIn('github'); // Call the signIn function from next-auth
}