import  http from "../http-common";
import authHeader from './auth-header';


class ProductsDataService{

    getProductsNotDeleted(){
        return http.get(`/api/products/notDeleted`,{headers: authHeader()});
    }
    getProducts(page, size){
        return http.get(`/api/products?page=${page}&size=${size}`, {headers: authHeader()});
    }
    getProductsBySlug(slug,page, size ){
        return http.get(`/api/products?slug=${slug}&page=${page}&size=${size}`, {headers: authHeader()});
    }
    getProduct(id){
        return http.get(`/api/products/${id}`, {headers: authHeader()});
    }
    createProduct(formData){
        return http.post("/api/products", formData,{headers: authHeader()});
    }
    uploadImage(file) {
        let formData = new FormData();
        formData.append("image", file);
        return http.post("/api/products/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": authHeader().Authorization
            },
        });
    }

    updateProduct(id, data){

        return http.put(`/api/products/${id}`, data, {headers: authHeader()});
    }
    deleteProduct(id,data){
        return http.patch(`/api/products/${id}`, data,{headers: authHeader()});
    }
}

export default new ProductsDataService();