import  http from "../http-common";

class CategoriesDataService{
    getCategoriesNotDeleted(){
        return http.get(`/api/categories/notDeleted`);
    }

    getCategories(page, size){
        return http.get(`/api/categories?page=${page}&size=${size}`);
    }
    getCategoriesBySlug(page, size, slug){
        return http.get(`/api/categories?slug=${slug}&page=${page}&size=${size}`);
    }
    getCategory(id){
        return http.get(`/api/categories/${id}`);
    }
    createCategory(data){
        return http.post("/api/categories", data);
    }
    updateCategory(id, data){
        return http.put(`/api/categories/${id}`, data);
    }
    deleteCategory(id,data){
        return http.patch(`/api/categories/${id}`, data);
    }
}
export default new CategoriesDataService();