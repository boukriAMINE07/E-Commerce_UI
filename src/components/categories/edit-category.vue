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
      <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span> Edit Category</h4>

      <!-- Basic Layout -->
      <div class="row">
        <div class="col-xl">
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Category   {{category}}</h5>
            </div>
            <div class="card-body">
              <form>


                  <div class="row">
                    <div class="col mb-3">
                      <label for="nameBasic" class="form-label">Name</label>
                      <input type="text" id="nameBasic" class="form-control" name="name" v-model="category.name" placeholder="Enter Name"  />
                      <span v-if="category.errors['name']" class="text-danger">{{ category.errors['name'] }}</span>

                    </div>
                  </div>
                  <div class="col mb-3">
                    <label for="emailBasic" class="form-label">Slug </label>
                    <input type="text" id="emailBasic" class="form-control" name="slug" v-model="category.slug" placeholder="Slug" />
                    <span v-if="category.errors['slug']" class="text-danger">{{ category.errors['slug'] }}</span>

                  </div>

                  <div class="col mb-3">
                    <label for="dobBasic" class="form-label">Description</label>
                    <textarea class="form-control" name="description" v-model="category.description" id="exampleFormControlTextarea1" rows="3"></textarea>                </div>
                <span v-if="category.errors['description']" class="text-danger">{{ category.errors['description'] }}</span>


<div class="mt-3">
  <button type="button" @click="editCategory" class="btn btn-primary me-2">Edit Category</button>
  <button type="button" @click="backToCategories" class="btn btn-outline-secondary me-2"> Cancel</button>
</div>

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
import CategoriesDataService from "@/services/CategoriesDataService";
import { onMounted, reactive} from "vue";
import {object, string} from "yup";
import {useRoute} from "vue-router/dist/vue-router";
import router from "@/router";

export default {
  name: "edit-category",
  setup() {
    const route = useRoute();
    let category = reactive({
      id: route.params.id,
      name: "",
      slug: "",
      description: "",
      createdAt: "",
      updatedAt: null,
      deleted: false,
      errors:{}
    });

    const validationSchema = object().shape({
      name: string().required().trim().min(4, "Name must be at least 4 characters"),
      slug: string().required().trim(),
      description: string().required().trim(),
    });

    function formatSlug(input) {
      // Remplace les espaces par des tirets
      let slug = input.trim().replace(/\s+/g, '-').toLowerCase();

      // Supprime tous les caractères non alphanumériques et les tirets
      slug = slug.replace(/[^a-z0-9-]/g, '');

      return slug;
    }
      function backToCategories() {

        router.push({ name: 'categories' });
      }
    //Format Slug

    function  getCategory(id){
      CategoriesDataService.getCategory(id)
          .then(response => {
            //category = response.data;
            category.name = response.data.name;
            category.slug = response.data.slug;
            category.description = response.data.description;
            category.createdAt = response.data.createdAt;
            category.updatedAt = response.data.updatedAt;
            category.deleted = response.data.deleted;
            console.log(category);
          })
          .catch(e => {
            console.log(e);
          });
    }

    const editCategory = () => {
      validationSchema
          .validate(category, {abortEarly: false})
          .then(() => {
            const now = new Date();
            const offset = -120; // décalage horaire de 2 heures en minutes (Maroc UTC+1, donc offset=-60, moins 1 heure pour UTC+0, donc offset=-120)
            const updatedDate = new Date(now.getTime() + offset * 60 * 1000);
            category.updatedAt   = updatedDate.toISOString();
            const data = {
              id: category.id,
              name: category.name,
              slug: formatSlug(category.slug),
              description: category.description,
              createdAt: category.createdAt,
              updatedAt: category.updatedAt,
              deleted: category.deleted,
            };

            CategoriesDataService.updateCategory(data.id, data)
                .then(() => {
                  console.log("Category Update successfully.");

                  backToCategories();
                })
                .catch((e) => {
                  console.log(e);
                });
          })
          .catch((err) => {
            if (err.inner) {
              category.errors = err.inner.reduce((acc, { path, message }) => {
                acc[path] = message;
                return acc;
              }, {});
            } else {
              console.log(err);
            }
          });

    };

    onMounted(() => {
      getCategory(category.id);
    });

    return {category, editCategory,backToCategories, getCategory,validationSchema};
  },



}
</script>

<style scoped>

</style>