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
              <h5 class="mb-0">Category   </h5>
            </div>
            <div class="card-body">
              <form>


                  <div class="row">
                    <div class="col mb-3">
                      <label for="nameBasic" class="form-label">Name</label>
                      <input type="text" id="nameBasic" class="form-control" name="name" v-model="category.name" placeholder="Enter Name"  />
                    </div>
                  </div>
                  <div class="col mb-3">
                    <label for="emailBasic" class="form-label">Slug </label>
                    <input type="text" id="emailBasic" class="form-control" name="slug" v-model="category.slug" placeholder="Slug" />
                  </div>

                  <div class="col mb-3">
                    <label for="dobBasic" class="form-label">Description</label>
                    <textarea class="form-control" name="description" v-model="category.description" id="exampleFormControlTextarea1" rows="3"></textarea>                </div>



                <button type="button" @click="editCategory" class="btn btn-primary">Save Category</button>
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
export default {
  name: "edit-category",
  data(){
    return{
      id: this.$route.params.id,
      category: {
        id: null,
        name: "",
        slug: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        deleted: false,
      },
    }
  },
  methods:{
    getCategory(){
      CategoriesDataService.getCategory(this.id)
          .then(response => {
            this.category = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    editCategory(){
      const now = new Date();
      const offset = -120; // décalage horaire de 2 heures en minutes (Maroc UTC+1, donc offset=-60, moins 1 heure pour UTC+0, donc offset=-120)
      const updatedDate = new Date(now.getTime() + offset * 60 * 1000);
      this.category.updatedAt   = updatedDate.toISOString();
      this.category.slug = this.formatSlug(this.category.name);

      CategoriesDataService.updateCategory(this.id, this.category)
          .then(response => {
            console.log(response.data);

            this.$router.push({name: 'categories'});
          })
          .catch(() => {
            console.log(this.category.name);
          });
    },
    //Format Slug
    formatSlug(input) {
      // Remplace les espaces par des tirets
      let slug = input.trim().replace(/\s+/g, '-').toLowerCase();
      // Supprime tous les caractères non alphanumériques et les tirets
      slug = slug.replace(/[^a-z0-9-]/g, '');

      return slug;
    },
  },
  mounted(){
    this.getCategory();
  }
}
</script>

<style scoped>

</style>