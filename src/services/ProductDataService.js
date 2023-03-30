import  http from "../http-common";

class ProductsDataService{

    getProductsNotDeleted(){
        return http.get(`products/notDeleted`);
    }
    getProducts(page, size){
        return http.get(`/products?page=${page}&size=${size}`);
    }
    getProductsBySlug(slug,page, size ){
        return http.get(`/products?slug=${slug}&page=${page}&size=${size}`);
    }
    getProduct(id){
        return http.get(`/products/${id}`);
    }
    createProduct(formData){
        return http.post("/products", formData);
    }
    uploadImage(file) {
        let formData = new FormData();
        formData.append("image", file);
        return http.post("/products/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    updateProduct(id, data){

        return http.put(`/products/${id}`, data);
    }
    deleteProduct(id,data){
        return http.patch(`/products/${id}`, data);
    }
}

export default new ProductsDataService();