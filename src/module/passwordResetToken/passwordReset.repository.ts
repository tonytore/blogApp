import { db } from "@/config/db";

export async function createOrUpdateTokenRepo(email: string, token: string) {
    const existingToken = await db.password_reset_tokens.findUnique({
        where: { email },
    });
    if (existingToken) {
        await db.password_reset_tokens.upsert({
            where: { email },
            update: { token, createdAt: new Date() },
            create: { email, token, createdAt: new Date() },
        });
    }
    return existingToken
}

export async function findTokenRepo(email: string) {
    const token = await db.password_reset_tokens.findUnique({
        where: { email },
    });
    return token;
}

export async function deleteTokenRepo(email: string) {
    await db.password_reset_tokens.delete({
        where: { email },
    });
    return true
}
    