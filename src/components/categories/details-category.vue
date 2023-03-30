<template>

  <!-- Content wrapper -->
  <div class="content-wrapper mt-5" >
    <!-- Content -->

    <div id="pdf-content" class="container-xxl flex-grow-1 container-p-y">
      <div  class="row">
        <div class="col-md-1"></div>
        <div  class="col-md-10">
          <div class="card shadow-none bg-transparent border border-primary mb-4">
            <h5 class="card-header">Category Details</h5>
            <!-- Account -->

            <hr class="my-0"/>
            <div class="card-body">

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="firstName" class="form-label">Category Name</label>
                  <h4>{{ category.name }}</h4>
                </div>

                <div class="mb-3 col-md-6">
                  <label for="email" class="form-label">Slug</label>
                  <h5>{{ category.slug }}</h5>
                </div>

                <div class="mb-3 col-md-12">
                  <label class="form-label" for="phoneNumber">DESCRIPTION</label>
                  <div class="input-group input-group-merge">
                    <span class="text-dark">{{ category.description }}</span>

                  </div>
                </div>
                <div class="mt-3"></div>

                <div class="mb-3 col-md-6">
                  <label for="address" class="form-label">CREATED AT</label>
                  <h5><i class="bx bx-calendar-plus bx-md text-primary me-3"></i> <strong>{{
                      new Date(category.createdAt).toLocaleString('fr-FR', {
                        timeZone: 'Europe/Paris',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric'
                      })
                    }}</strong>
                  </h5></div>
                <div class="mb-3 col-md-6">
                  <label for="address" class="form-label">THE LATEST UPDATE TO :</label>
                  <h5><i class="bx bx-calendar-edit bx-md text-primary me-3"></i> <strong>{{
                      new Date(category.updatedAt).toLocaleString('fr-FR', {
                        timeZone: 'Europe/Paris',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric'
                      })
                    }}</strong>
                  </h5>
                </div>


              </div>

            </div>
            <!-- /Account -->
          </div>
        </div>
        <div class="col-md-1"></div>

      </div>
    </div>
    <!-- / Content -->


  </div>
  <div class="content-wrapper">
    <div class="container-xxl flex-grow container-p-y">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <button type="button" @click="exporterPDF(category)" class="btn btn-primary me-2">
          <i class='bx bxs-file-pdf  p-1' ></i>
          Exporter PDF
        </button>
        </div>
        <div class="col-md-1"></div>

      </div>




    </div>
  </div>
  <!-- Content wrapper -->
</template>

<script>
import CategoriesDataService from "@/services/CategoriesDataService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
  name: "details-category",
  data() {
    return {
      category: {
        id:this.$route.params.id,
        name: "",
        slug: "",
        description: "",
        createdAt: "",
        updatedAt: "",
      },
    };
  },
  methods: {
    getCategory(){
      CategoriesDataService.getCategory(this.category.id)
        .then((response) => {
          this.category = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    exporterPDF(category) {
      // Create a new jsPDF instance
      html2canvas(document.querySelector('#pdf-content')).then(canvas => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add the image to the PDF
        doc.addImage(canvas.toDataURL(), 'PNG', 0, 0, 250, 250);

        // Save the PDF
        doc.save(`${category.name}.pdf`);
      });
    },

  },
  mounted() {
    this.getCategory();
  },
}
</script>

<style scoped>

</style>