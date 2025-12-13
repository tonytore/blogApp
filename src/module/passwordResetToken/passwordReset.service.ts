import { createOrUpdateTokenRepo, deleteTokenRepo, findTokenRepo } from "./passwordReset.repository";

export async function createOrUpdateToken(email: string, token: string) {
    return createOrUpdateTokenRepo(email, token)
}

export async function findToken(email: string) {
    return findTokenRepo(email)
}

export async function deleteToken(email: string) {
   return deleteTokenRepo(email)
}