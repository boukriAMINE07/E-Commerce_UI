import  http from "../http-common";
import authHeader from './auth-header';

class CategoriesDataService{
    getCategoriesNotDeleted(){
        return http.get(`/api/categories/notDeleted`,{headers: authHeader()});
    }

    getCategories(page, size){
        return http.get(`/api/categories?page=${page}&size=${size}`, {headers: authHeader()});
    }
    getCategoriesBySlug(page, size, slug){
        return http.get(`/api/categories?slug=${slug}&page=${page}&size=${size}`, {headers: authHeader()});
    }
    getCategory(id){
        return http.get(`/api/categories/${id}`, {headers: authHeader()});
    }
    createCategory(data){
        return http.post("/api/categories", data,{headers: authHeader()});
    }
    updateCategory(id, data){

        return http.put(`/api/categories/${id}`, data, {headers: authHeader()});
    }
    deleteCategory(id,data){
        return http.patch(`/api/categories/${id}`, data,{headers: authHeader()});
    }
}
export default new CategoriesDataService();