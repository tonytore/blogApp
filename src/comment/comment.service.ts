import * as repo from "./comment.repository"

export type createCommentPayload = {
  text: string;
  postId: string;
  authorId?: string | null;
  isPublic: boolean;
};

export type updateCommentPayload = {
  id: string;
  text: string;
};


export async function listCommentService(){
    return repo.listCommentRepository()
}

export async function createComment({text,postId,authorId,isPublic}:createCommentPayload){
    return repo.createCommentRepository({text,postId,authorId,isPublic})
}

export async function updateComment({id,text}:updateCommentPayload){
    return repo.updateCommentRepository({id,text})
}

export async function deleteCommentService(id:string){
    return repo.deleteCommentRepository(id)
}