import * as repo from "./tag.repository"

export type createTagPayload = {
  name: string;
};

export type updateTagPayload = {
  id: string;
  name: string;
};


export async function listTagService(){
    return repo.listTagRepository()
}

export async function createTag({name}:createTagPayload){
    return repo.createTagRepository({name})
}

export async function updateTag({id,name}:updateTagPayload){
    return repo.updateTagRepository({id,name})
}

export async function deleteTagService(id:string){
    return repo.deleteTagRepository(id)
}