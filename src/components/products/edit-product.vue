<template>
  <nav
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
  >
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="bx bx-menu bx-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
    </div>
  </nav>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
      <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span> Edit Product</h4>

      <!-- Basic Layout -->
      <div class="row">
        <div class="col-xl">
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Product  </h5>
            </div>
            <div class="card-body">
              <form>

                <div class="row">
                  <div class="col mb-3">
                    <label for="nameBasic" class="form-label">Name</label>
                    <input type="text" id="nameBasic" class="form-control" name="name" v-model="product.name"
                           placeholder="Enter Name"/>
                    <span v-if="product.errors['name']" class="text-danger">{{ product.errors['name'] }}</span>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlSelect1" class="form-label">Choose Category</label>
                  <select class="form-select" name="category" v-model="product.category" id="exampleFormControlSelect1" aria-label="Default select example">
                    <option disabled value="">Choose Category</option>
                    <option v-for="category in categoriesAreNotDeleted" :key="category.id" :value="category" :selected="product.category.id === category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <span v-if="product.errors['category.name']" class="text-danger">{{ product.errors['category.name'] }}</span>

                </div>
                <div class="col mb-3">
                  <label for="emailBasic" class="form-label">Slug </label>
                  <input type="text" id="emailBasic" class="form-control" name="slug" v-model="product.slug"
                         placeholder="Slug"/>
                  <span v-if="product.errors['slug']" class="text-danger">{{ product.errors['slug'] }}</span>
                </div>
                <div class="col mb-3">
                  <label for="nameBasic" class="form-label">Price </label>
                  <input type="text" id="nameBasic" class="form-control" name="price" v-model="product.price"
                         placeholder="Enter Name"/>
                  <span v-if="product.errors['price']" class="text-danger">{{ product.errors['price'] }}</span>
                </div>
                <div class="col mb-3">
                  <label for="image" class="form-label">Image </label>
                  <div class="row">
                  <div class=" col-md-2 ">
                    <img
                      :src="product.image"
                      :alt="product.image"
                      class="d-block rounded"
                      height="100"
                      width="100"
                      id="uploadedAvatar"
                  />
                  </div>
                  <div class=" col-md-10 ">
                    <input  type="file" id="image" class="form-control mt-3" @change="uploadImage"  ref="fileInput" name="image" accept="image/*"/>
                  </div>
                  </div>


                </div>

                <div class="col mb-3">
                  <label for="dobBasic" class="form-label">Description </label>
                  <textarea class="form-control" name="description" v-model="product.description"
                            id="exampleFormControlTextarea1" rows="3"></textarea></div>




                <button type="button" @click="editProduct" class="btn btn-primary">Edit Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- / Content -->

    <!-- Footer -->
    <footer class="content-footer footer bg-footer-theme">
      <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
        <div class="mb-2 mb-md-0">
          ©
          2023
          , made with ❤️ by
          <a href="javascript:void(0)"  class="footer-link fw-bolder">Amine BOUKRI</a>
        </div>

      </div>
    </footer>
    <!-- / Footer -->

    <div class="content-backdrop fade"></div>
  </div>
  <!-- Content wrapper -->


</template>
<script>
import ProductDataService from "@/services/ProductDataService";
import CategoriesDataService from "@/services/CategoriesDataService";
import {onMounted, reactive, ref} from "vue";
import {object, string} from "yup";
import {useRoute} from "vue-router/dist/vue-router";
import router from "@/router";
export default {
  name: "edit-product",
  setup() {


    const route = useRoute();
    const fileInput = ref(null)
    let product = reactive({
      id: route.params.id,
      name: "",
      slug: "",
      description: "",
      price: "",
      image: null,
      createdAt: "",
      updatedAt: "",
      deleted: false,
      errors: {},
      category: {
        id: "",
        name: "",
        slug: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        deleted: false,
      }
    });
    const validationSchema = object().shape({
      name: string().required().trim().min(4, "Name must be at least 4 characters"),
      slug: string().required().trim(),
      // comment faire pour valider que le choix de l'image est obligatoire
      // image: mixed().required("Image is a required field"),
      description: string().required().trim(),
      price: string().required().trim().matches(/^[0-9]+$/, "Price must be a number"),
      category: object().shape({
        id: string().required().trim(),
        name: string().required("Category Name is required field").trim(),
        slug: string().required().trim(),
        description: string().required().trim(),
      })
    });


    function formatSlug(input) {
      // Remplace les espaces par des tirets
      let slug = input.trim().replace(/\s+/g, '-').toLowerCase();

      // Supprime tous les caractères non alphanumériques et les tirets
      slug = slug.replace(/[^a-z0-9-]/g, '');

      return slug;
    }

    function getProduct() {
      ProductDataService.getProduct(product.id)
          .then((response) => {
            product.name = response.data.name;
            product.slug = response.data.slug;
            product.description = response.data.description;
            product.price = response.data.price;
            product.image = response.data.image;
            product.createdAt = response.data.createdAt;
            product.updatedAt = response.data.updatedAt;
            product.deleted = response.data.deleted;
            product.category = response.data.category;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    }

    function backToProducts() {

      router.push({name: 'products'});
    }

    function editProduct() {
      validationSchema.validate(product, {abortEarly: false})
          .then(() => {
            const now = new Date();
            const offset = -120; // décalage horaire de 2 heures en minutes (Maroc UTC+1, donc offset=-60, moins 1 heure pour UTC+0, donc offset=-120)
            const updatedDate = new Date(now.getTime() + offset * 60 * 1000);
            product.updatedAt = updatedDate.toISOString();
            product.slug = formatSlug(product.slug);
            const data = {
              id: product.id,
              name: product.name,
              slug: product.slug,
              description: product.description,
              price: product.price,
              image: product.image,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
              deleted: product.deleted,
              category: product.category
            };
            ProductDataService.updateProduct(data.id, data)
                .then((response) => {
                  console.log(response.data);
                  backToProducts()
                })
                .catch((e) => {
                  console.log(e);
                });
          })
          .catch((err) => {
            if (err.inner) {
              product.errors = err.inner.reduce((acc, {path, message}) => {
                acc[path] = message;
                return acc;
              }, {});
            } else {
              console.log(err);
            }
          });
    }

    function uploadImage() {

      const file = fileInput.value ? fileInput.value.files[0] : null;
      if (!file) {
        console.log('No file selected');
        return;
      }
      ProductDataService.uploadImage(file)
          .then(response => {
            console.log(response.data);
            product.image = response.data.image;
          })
          .catch(e => {
            console.log(e);
          });
    }

    onMounted(() => {
      getProduct();
    });

    return {
      product,
      formatSlug,
      validationSchema,
      uploadImage,
      fileInput,
      getProduct,
      editProduct,

    };
  },
  data() {
    return {
      categoriesAreNotDeleted: []
    };
  },
  methods:{
    getCategoriesAreNotDeleted() {
      CategoriesDataService.getCategoriesNotDeleted()
          .then((response) => {
            this.categoriesAreNotDeleted = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.getCategoriesAreNotDeleted();
  }
}

</script>

<style scoped>

</style>