<template>
  <nav v-if="currentUser"
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
  >
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="bx bx-menu bx-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <!-- Search -->
      <div class="navbar-nav align-items-center">
        <div class="nav-item d-flex align-items-center">
          <i class="bx bx-search fs-4 lh-0"></i>
          <input
              type="text"
              class="form-control border-0 shadow-none"
              placeholder="Search here By Slug"
              aria-label="Search..."
              v-model="searchBySlug"
              @keyup="retrieveProductsBySlug"
          />
        </div>
      </div>
      <!-- /Search -->

      <ul class="navbar-nav flex-row  align-items-center ms-auto">
        <!-- Place this tag where you want the button to render. -->
        <li class="nav-item lh-1 me-3">
          <h4 class="fw-bold py-3 mt-1">
            <div class="demo-inline-spacing">
              <div class="btn-group">
                <button
                    type="button"
                    class="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                  <i class="bx bx-show bx-flashing "></i>
                  Export
                </button>
                <ul class="dropdown-menu">
                  <li @click="exportListToExcel(this.products)" ><a class="dropdown-item text-primary" href="javascript:void(0);">
                    <i class='bx bxs-file-doc p-2 text-success' ></i>

                    Excel
                  </a></li>
                  <li @click="exportListToExcel(this.productsAreNotDeleted)" ><a class="dropdown-item text-primary" href="javascript:void(0);">
                    <i class='bx bxs-file-export p-2 text-success' ></i>
                    All records</a></li>

                </ul>
              </div>
              <div class="btn-group">
                <button type="button" data-bs-toggle="modal" data-bs-target="#basicModal"
                        class="btn btn-primary me-2">
                  + Add New Record
                </button>
              </div>
            </div>

          </h4>
        </li>
        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
            <div class="avatar avatar-online">
              <img src="/assets/assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
            </div>
          </a>
          <ul  class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar avatar-online">
                      <img src="/assets/assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <span class="fw-semibold d-block">{{currentUser.username}}</span>
                    <small v-for="role in currentUser.roles" :key="role" class="text-muted">
                      <p v-if="role==='ROLE_ADMIN'">Admin</p>
                      <p v-if="role==='ROLE_USER'">User</p>
                    </small>
                  </div>
                </div>
              </a>
            </li>


            <li>
              <a class="dropdown-item" @click.prevent="logOut">
                <i class="bx bx-power-off me-2"></i>
                <span class="align-middle">Log Out</span>
              </a>
            </li>
          </ul>
        </li>
        <!--/ User -->
      </ul>
      <!-- Button trigger modal -->


    </div>
  </nav>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
      <!-- Modal -->
      <div class="modal fade" id="basicModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel1">New Product</h5>
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                <select class="form-select" name="category" v-model="product.category" id="exampleFormControlSelect1"
                        aria-label="Default select example">
                  <option selected disabled>Open this select menu</option>
                  <option v-for="category in categoriesAreNotDeleted" :key="category.id" :value="category">
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
                <label for="emailBasic" class="form-label">Price </label>
                <input type="text" id="emailBasic" class="form-control" name="price" v-model="product.price"
                       placeholder="Price"/>
                <span v-if="product.errors['price']" class="text-danger">{{ product.errors['price'] }}</span>
              </div>

              <div class="col mb-3">
                <label for="dobBasic" class="form-label">Description</label>
                <textarea class="form-control" name="description" v-model="product.description"
                          id="exampleFormControlTextarea1" rows="3"></textarea>
                <span v-if="product.errors['description']" class="text-danger">{{ product.errors['description'] }}</span>
              </div>
              <div class="col mb-3">
                <label for="image" class="form-label">Image</label>
                <input type="file" id="image" class="form-control" ref="fileInput" name="image" accept="image/*" @change="uploadImage" />
                <span v-if="product.errors['image']" class="text-danger">{{ product.errors['image'] }}</span>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="saveProduct" class="btn btn-primary">Save Product</button>
            </div>
          </div>
        </div>
      </div>


      <!-- Bootstrap Table with Caption -->
      <div class="card">
        <h5 class="card-header"><strong>Products</strong></h5>
        <div class="table-responsive text-nowrap">
          <table class="table table-striped  ">

            <thead class="">
            <tr class="text-nowrap ">
              <th class="text-primary"><i @click="triAscOfProductsByName" class="bx bxs-up-arrow-alt "></i> <i @click="triDescOfProductsByName" class="bx bxs-down-arrow-alt "></i> Product NAME</th>
              <th  class="text-primary">Image</th>
              <th  class="text-primary">Category Name</th>
              <th  class="text-primary">SLUG</th>
              <th class="text-primary">DESCRIPTION</th>
              <th class="text-primary">CreatedAT</th>
              <th class="text-primary">UpdatedAT</th>
              <th class="text-primary">Price</th>
              <th></th>

            </tr>
            </thead>
            <tbody class="table-hover">
            <tr v-for="product in products" :key="product.id" @dblclick="detailsProduct(product.id)">

              <td class="text-truncate" style="max-width: 300px;"><i class="fa-lg text-danger me-5"></i> <strong>{{ product.name }}</strong></td>
              <td>
                <img
                    :src="'/assets/assets/img/'+product.image"
                    alt="user-avatar"
                    class="d-block rounded"
                    height="100"
                    width="100"
                    id="uploadedAvatar"
                />
              </td>
              <td >{{ product.category.name }}</td>


              <td  class="text-truncate" style="max-width: 300px;">{{ product.slug }}</td>
              <td class="text-truncate" style="max-width: 300px;">
                {{ product.description }}
              </td>
              <td>
                {{
                  new Date(product.createdAt).toLocaleString('fr-FR', {
                    timeZone: 'Europe/Paris',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric'
                  })
                }}
              </td>
              <td class="text-success" v-if="product.updatedAt!=null">
                {{
                  new Date(product.updatedAt).toLocaleString('fr-FR', {
                    timeZone: 'Europe/Paris',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric'
                  })
                }}
              </td>
              <td class="text-danger" v-else>
                Not updated yet
              </td>
              <td>
                {{ product.price }}
              </td>
              <td>
                <div class="dropdown">
                  <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu">

                    <a class="dropdown-item text-primary" @click="detailsProduct(product.id)" href="javascript:void(0);"><i
                        class="bx bx-show-alt  p-2"></i>Details </a>
                    <a class="dropdown-item text-success" @click="updateProduct(product.id)" href="javascript:void(0);"><i
                        class="bx bx-edit-alt    p-2"></i>Edit</a>
                    <a class="dropdown-item text-danger" @click="deleteProduct(product)" href="javascript:void(0);"><i
                        class="bx bx-trash-alt  p-2"></i>Delete</a>

                  </div>
                </div>
              </td>
            </tr>

            </tbody>
            <tfoot>
            <tr>
              <th class="text-primary"><i @click="triAscOfProductsByName" class="bx bxs-up-arrow-alt "></i> <i @click="triDescOfProductsByName" class="bx bxs-down-arrow-alt "></i> Product NAME</th>
              <th  class="text-primary">Image</th>
              <th  class="text-primary">Category Name</th>
              <th  class="text-primary">SLUG</th>
              <th class="text-primary">DESCRIPTION</th>
              <th class="text-primary">CreatedAT</th>
              <th class="text-primary">UpdatedAT</th>
              <th class="text-primary">Price</th>
              <th></th>
            </tr>
            </tfoot>
          </table>
          <div class="demo-inline-spacing">
            <!-- Basic Pagination -->
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li class="page-item first" :class="{ disabled: currentPage <= 0 }">
                  <a class="page-link" href="javascript:void(0);" @click="currentPage > 0 && previousPage()">
                    <i class="tf-icon bx bx-chevrons-left"></i>
                  </a>
                </li>

                <li class="page-item" v-for="page in totalPages" :key="page-1"
                    :class="{ active: page-1 === currentPage }">
                  <a class="page-link" href="javascript:void(0)" @click="goToPage(page-1)">{{ page }}</a>
                </li>

                <li class="page-item last" :class="{ disabled: currentPage+1 >= totalPages }">
                  <a class="page-link" href="javascript:void(0);" @click="currentPage+1 < totalPages && nextPage()">
                    <i class="tf-icon bx bx-chevrons-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
            <!--/ Basic Pagination -->
          </div>
        </div>
      </div>
      <!-- Bootstrap Table with Caption -->
      <hr class="my-5"/>
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
import * as XLSX from "xlsx";
import CategoriesDataService from "@/services/CategoriesDataService";
//import {useRoute} from "vue-router/dist/vue-router";
import {reactive} from "vue";
import { object, string} from "yup";
import { ref } from 'vue'


export default {
  name: "list-products",
  setup() {
    //const route = useRoute();
    const fileInput = ref(null)
    let product = reactive({
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
      description: string().required().trim(),
      price: string().required().trim(),
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

    function  uploadImage() {

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

    const saveProduct = () => {
      validationSchema
          .validate(product, {abortEarly: false})
          .then(() => {
            const now = new Date();
            const offset = -120; // décalage horaire de 2 heures en minutes (Maroc UTC+1, donc offset=-60, moins 1 heure pour UTC+0, donc offset=-120)
            const createdDate = new Date(now.getTime() + offset * 60 * 1000);

            product.createdAt = createdDate.toISOString();
            const data = {
              name: product.name,
              slug: formatSlug(product.slug),
              description: product.description,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
              deleted: product.deleted,
              price: product.price,
              image: product.image,
              category: {
                id: product.category.id,
                name: product.category.name,
                slug: product.category.slug,
                description: product.category.description,
                createdAt: product.category.createdAt,
                updatedAt: product.category.updatedAt,
                deleted: product.category.deleted,
              }
            };

            ProductDataService.createProduct(data)
                .then(() => {
                  console.log("Product added successfully.");
                  location.reload();
                })
                .catch((e) => {
                  console.log(e);
                });
          })
          .catch((err) => {
            if (err.inner) {
              product.errors = err.inner.reduce((acc, { path, message }) => {
                acc[path] = message;
                return acc;
              }, {});
            } else {
              console.log(err);
            }
          });

    };
    return {
      product,
      saveProduct,
      formatSlug,
      validationSchema,
      uploadImage,
      fileInput
    };
  },

  data() {
    return {
      productsAreNotDeleted: [],
      categoriesAreNotDeleted: [],
      products: [],

      currentPage: 0,
      defaultSize: 10,
      totalPages: 0,
      totalElements: 0,
      searchBySlug: "",

    };
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    // Get all products
    getAllProductsAreNotDeleted() {
      ProductDataService.getProductsNotDeleted()
          .then(response => {
            this.productsAreNotDeleted = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    getListCategoriesNotDeleted() {
      CategoriesDataService.getCategoriesNotDeleted()
          .then((response) => {
            this.categoriesAreNotDeleted = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    retrieveProducts: function () {
      ProductDataService.getProducts(this.currentPage, this.defaultSize)
          .then(response => {
            this.products = response.data.products;
            this.totalPages = response.data.totalPages;
            this.totalElements = response.data.totalElements;
          })
          .catch(e => {
            console.log(e);
          });
    },
    retrieveProductsBySlug() {
      this.currentPage = 0;
      ProductDataService.getProductsBySlug(this.searchBySlug, this.currentPage, this.defaultSize)
          .then(response => {
            this.products = response.data.products;
            this.totalPages = response.data.totalPages;
            this.totalElements = response.data.totalElements;
          })
          .catch(e => {
            console.log(e);
          });
    },

    // Save product
   /* saveProduct() {
      const now = new Date();
      const offset = -120; // décalage horaire de 2 heures en minutes (Maroc UTC+1, donc offset=-60, moins 1 heure pour UTC+0, donc offset=-120)
      const createdDate = new Date(now.getTime() + offset * 60 * 1000);
      this.product.createdAt = createdDate.toISOString();

      //const formData = new FormData();
      //formData.append('image', this.product.image);

      //const productData = { ...this.product, category: { ...this.product.category, id: parseInt(this.product.category.id) } };
      //formData.append('product', JSON.stringify(productData));


      ProductDataService.createProduct(this.product)
          .then(response => {
            console.log(response.data);
            location.reload();
          })
          .catch(e => {
            console.log(e);
          });
    } ,*/



    // Update product
    updateProduct(id){
      this.$router.push({name: 'edit-product', params: {id: id}});
    },
    // Delete product
    deleteProduct(product) {
      ProductDataService.deleteProduct(product.id, product)
          .then(() => {
            console.log("Product deleted successfully!");
            this.retrieveProducts();
          })
          .catch(e => {
            console.log(e);
          });
    },

    // Details product
    detailsProduct(id){
      this.$router.push({name: 'product-details', params: {id: id}});
    },

    triAscOfProductsByName(){
      this.products = this.products.sort((a, b) => a.name.localeCompare(b.name));
    },
    triDescOfProductsByName(){
      this.products = this.products.sort((a, b) => b.name.localeCompare(a.name));
    },

    //Export Excel
    exportListToExcel(input) {
      // Créer une nouvelle feuille de calcul
      const wb = XLSX.utils.book_new();

      // Convertir la liste en tableau de données
      const data = input.map(product => {
        return {
          "Product Name": product.name,
          "Category Name": product.category.name,
          "Slug": product.slug,
          "Description": product.description,
          "Price": product.price,
          "Image": product.image,
          "Created At": new Date(product.createdAt).toLocaleString('fr-FR', {
            timeZone: 'Europe/Paris',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
          })
          , "updated At": new Date(product.updatedAt).toLocaleString('fr-FR', {
            timeZone: 'Europe/Paris',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
          })
        };
      });

      // Ajouter les données à la feuille de calcul
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'listProducts');

      // Générer le fichier Excel et le télécharger
      const fileName = 'listProducts.xlsx';
      XLSX.writeFile(wb, fileName);
    },






//pagination methods
    previousPage() {
      this.currentPage--;
      this.retrieveProducts();
    },
    nextPage() {
      this.currentPage++;
      this.retrieveProducts();
    },
    goToPage(page) {
      this.currentPage = page;
      console.log(this.currentPage)
      this.retrieveProducts();
    }
  },
  mounted() {
    this.retrieveProducts();
    this.getAllProductsAreNotDeleted();
    this.getListCategoriesNotDeleted();
    if (this.currentUser==null || !this.currentUser.roles.includes("ROLE_ADMIN")) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>