import * as repo from "./category.repository"

export type createCategoryPayload = {
  name: string;
};

export type updateCategoryPayload = {
  id: string;
  name: string;
};


export async function listCategoryService(){
    return repo.listCategoryRepository()
}

export async function createCategory({name}:createCategoryPayload){
    return repo.createCategoryRepository({name})
}

export async function updateCategory({id,name}:updateCategoryPayload){
    return repo.updateCategoryRepository({id,name})
}

export async function deleteCategoryService(id:string){
    return repo.deleteCategoryRepository(id)
}