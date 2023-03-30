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
              @keyup="retrieveCategoriesBySlug"
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
                  <li @click="exportListToExcel(this.categories)" ><a class="dropdown-item text-primary" href="javascript:void(0);">
                    <i class='bx bxs-file-doc p-2 text-success' ></i>

                    Excel
                  </a></li>
                  <li @click="exportListToExcel(this.categoriesNotDeleted)" ><a class="dropdown-item text-primary" href="javascript:void(0);">
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
      </ul>      <!-- Button trigger modal -->


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
              <h5 class="modal-title" id="exampleModalLabel1">New Category</h5>
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
                  <input type="text" id="nameBasic" class="form-control" name="name" v-model="category.name"
                         placeholder="Enter Name"/>
                </div>
              </div>
              <div class="col mb-3">
                <label for="emailBasic" class="form-label">Slug </label>
                <input type="text" id="emailBasic" class="form-control" name="slug" v-model="category.slug"
                       placeholder="Slug"/>
              </div>

              <div class="col mb-3">
                <label for="dobBasic" class="form-label">Description</label>
                <textarea class="form-control" name="description" v-model="category.description"
                          id="exampleFormControlTextarea1" rows="3"></textarea></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="saveCategory" class="btn btn-primary">Save Category</button>
            </div>
          </div>
        </div>
      </div>


      <!-- Bootstrap Table with Caption -->
      <div class="card">
        <h5 class="card-header">Categories</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">

            <thead>
            <tr>
              <th class="text-primary"><i @click="triAscOfCategoriesByName" class="bx bxs-up-arrow-alt "></i> <i @click="triDescOfCategoriesByName" class="bx bxs-down-arrow-alt "></i>NAME</th>
              <th class="text-primary"><strong>SLUG</strong> </th>
              <th class="text-primary">DESCRIPTION</th>
              <th class="text-primary">CreatedAT</th>
              <th class="text-primary">UpdatedAT</th>
              <th></th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{ category.name }}</strong></td>
              <td>{{ category.slug }}</td>
              <td class="text-truncate" style="max-width: 300px;">
                {{ category.description }}
              </td>
              <td>
                {{
                  new Date(category.createdAt).toLocaleString('fr-FR', {
                    timeZone: 'Europe/Paris',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric'
                  })
                }}
              </td>
              <td v-if="category.updatedAt!=null">
                {{
                  new Date(category.updatedAt).toLocaleString('fr-FR', {
                    timeZone: 'Europe/Paris',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric'
                  })
                }}
              </td>
              <td v-else>
                Not updated yet
              </td>

              <td>
                <div class="dropdown">
                  <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu">

                    <a class="dropdown-item text-primary" @click="detailsCategory(category.id)" href="javascript:void(0);"><i
                        class="bx bx-show-alt  p-2"></i>Details </a>
                    <a class="dropdown-item text-success" @click="updateDoctor(category.id)" href="javascript:void(0);"><i
                        class="bx bx-edit-alt    p-2"></i>Edit</a>
                    <a class="dropdown-item text-danger" @click="deleteCategory(category)" href="javascript:void(0);"><i
                        class="bx bx-trash-alt  p-2"></i>Delete</a>
                  </div>
                </div>
              </td>
            </tr>

            </tbody>
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
import CategoriesDataService from "@/services/CategoriesDataService";
import * as XLSX from "xlsx";


export default {
  name: "list-categories",
  data() {
    return {
      categories: [],
      categoriesNotDeleted: [],
      currentPage: 0,
      defaultSize: 8,
      searchBySlug: "",
      totalCategories: 0,
      totalPages: 0,
      category: {
        id: null,
        name: "",
        slug: "",
        description: "",
        createdAt: "",
        updatedAt: null,
        deleted: false,
      },
      submitted: false,
      show: false
    };
  },
  methods: {
    getListCategoriesNotDeleted() {
      CategoriesDataService.getCategoriesNotDeleted()
          .then((response) => {
            this.categoriesNotDeleted = response.data;
            console.log("categoriesNotDeleted")
            console.log("categoriesNotDeleted "+ this.categoriesNotDeleted)
          })
          .catch((e) => {
            console.log(e);
          });
    },

    retrieveCategories() {
      CategoriesDataService.getCategories(this.currentPage, this.defaultSize)
          .then((response) => {
            this.categories = response.data.categories;
            this.totalCategories = response.data.totalItems;
            this.totalPages = response.data.totalPages;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    retrieveCategoriesBySlug() {
      this.currentPage = 0;
      CategoriesDataService.getCategoriesBySlug(this.currentPage, this.defaultSize, this.searchBySlug)
          .then((response) => {
            this.categories = response.data.categories;
            this.totalCategories = response.data.totalItems;
            this.totalPages = response.data.totalPages;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    triAscOfCategoriesByName(){
      this.categories=this.categories.sort((a,b)=>a.name.localeCompare(b.name))
    },
    triDescOfCategoriesByName(){
      this.categories=this.categories.sort((a,b)=>b.name.localeCompare(a.name))
    },
    saveCategory() {
      const now = new Date();
      const offset = -120; // décalage horaire de 2 heures en minutes (Maroc UTC+1, donc offset=-60, moins 1 heure pour UTC+0, donc offset=-120)
      const createdDate = new Date(now.getTime() + offset * 60 * 1000);

      this.category.createdAt   = createdDate.toISOString();
      var data = {
        name: this.category.name,
        slug: this.formatSlug(this.category.slug),
        description: this.category.description,
        deleted: this.category.deleted,
        updatedAt: this.category.updatedAt,
        createdAt: this.category.createdAt,
      }
      CategoriesDataService.createCategory(data)
          .then(() => {

            this.category.name = "";
            this.category.slug = "";
            this.category.description = "";
            this.category.deleted = false;
            this.category.updatedAt = "";
            this.category.createdAt = "";


            location.reload();


            this.retrieveCategories();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    // Details product
    detailsCategory(id){
      this.$router.push({name: 'category-details', params: {id: id}});
    },
    deleteCategory(data) {
      CategoriesDataService.deleteCategory(data.id, data)
          .then(() => {
            this.retrieveCategories();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    updateDoctor(id) {
      this.$router.push({name: 'edit-category', params: {id: id}});
    },
    previousPage() {
      this.currentPage--;
      this.retrieveCategories();
    },
    nextPage() {
      this.currentPage++;
      this.retrieveCategories();
    },
    goToPage(page) {
      this.currentPage = page;
      console.log(this.currentPage)
      this.retrieveCategories();
    },
    exportListToExcel(input) {
      // Créer une nouvelle feuille de calcul
      const wb = XLSX.utils.book_new();

      // Convertir la liste en tableau de données
      const data = input.map(category => {
        return {
          "Name": category.name,
          "Slug": category.slug,
          "Description": category.description,
          "Created At": new Date(category.createdAt).toLocaleString('fr-FR', {
            timeZone: 'Europe/Paris',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
          })
          ,"updated At": new Date(category.updatedAt).toLocaleString('fr-FR', {
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
      XLSX.utils.book_append_sheet(wb, ws, 'listCategories');

      // Générer le fichier Excel et le télécharger
      const fileName = 'listCategories.xlsx';
      XLSX.writeFile(wb, fileName);
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
  mounted() {
    this.retrieveCategories();
    this.getListCategoriesNotDeleted();
  },

}
</script>

<style scoped>

</style>