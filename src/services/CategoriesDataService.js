import  http from "../http-common";

class CategoriesDataService{
    getCategoriesNotDeleted(){
        return http.get(`/categories/notDeleted`);
    }

    getCategories(page, size){
        return http.get(`/categories?page=${page}&size=${size}`);
    }
    getCategoriesBySlug(page, size, slug){
        return http.get(`/categories?slug=${slug}&page=${page}&size=${size}`);
    }
    getCategory(id){
        return http.get(`/categories/${id}`);
    }
    createCategory(data){
        return http.post("/categories", data);
    }
    updateCategory(id, data){

        return http.put(`/categories/${id}`, data);
    }
    deleteCategory(id,data){
        return http.patch(`/categories/${id}`, data);
    }
}
export default new CategoriesDataService();