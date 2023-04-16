import  http from "../http-common";


class ProductsDataService{

    getProductsNotDeleted(){
        return http.get(`/api/products/notDeleted`);
    }
    getProducts(page, size){
        return http.get(`/api/products?page=${page}&size=${size}`);
    }
    getProductsBySlug(slug,page, size ){
        return http.get(`/api/products?slug=${slug}&page=${page}&size=${size}`);
    }
    getProduct(id){
        return http.get(`/api/products/${id}`);
    }
    createProduct(formData){
        return http.post("/api/products", formData);
    }
    uploadImage(file) {
        let formData = new FormData();
        formData.append("image", file);
        return http.post("/api/products/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    updateProduct(id, data){

        return http.put(`/api/products/${id}`, data);
    }
    deleteProduct(id,data){
        return http.patch(`/api/products/${id}`, data);
    }
}

export default new ProductsDataService();