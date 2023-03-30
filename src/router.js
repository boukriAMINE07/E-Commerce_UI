import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/categories",
        name: "categories",
        component: () => import("./components/categories/list-categories")
    },
    {
        path: "/categories/edit/:id",
        name: "edit-category",
        component: () => import("./components/categories/edit-category")

    },
    {
        path: "/categories/details/:id",
        name: "category-details",
        component: () => import("./components/categories/details-category")
    },
    {
        path: "/products",
        name: "products",
        component: () => import("./components/products/list-products")
    },
    {
        path: "/products/edit/:id",
        name: "edit-product",
        component: () => import("./components/products/edit-product")
    },
    {
        path: "/products/details/:id",
        name: "product-details",
        component: () => import("./components/products/details-product")
    }


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
