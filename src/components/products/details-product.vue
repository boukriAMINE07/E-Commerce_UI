<template>

  <!-- Content wrapper -->
  <div class="content-wrapper mt-5" id="pdf-content">
    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="row">
        <div class="col-md-12">
          <div class="card card shadow-none bg-transparent border border-primary mb-4">
            <h5 class="card-header">Product Details</h5>
            <!-- Account -->
            <div class="card-body">
              <div class="d-flex align-items-start align-items-sm-center gap-4">
                <img
                    src="/assets/assets/img/avatars/1.png"
                    alt="user-avatar"
                    class="d-block rounded"
                    height="100"
                    width="100"
                    id="uploadedAvatar"
                />
              </div>
            </div>
            <hr class="my-0"/>
            <div class="card-body">

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="firstName" class="form-label">Product Name</label>
                  <h4>{{ product.name }}</h4>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="lastName" class="form-label">Category Name</label>
                  <h4>{{ product.category.name }}</h4>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="email" class="form-label">Slug</label>
                  <h5>{{ product.slug }}</h5>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="organization" class="form-label">PRICE</label>
                  <h5>{{ product.price }} &nbsp; MAD </h5>
                </div>
                <div class="mb-3 col-md-12">
                  <label class="form-label" for="phoneNumber">DESCRIPTION</label>
                  <div class="input-group input-group-merge">
                    <span class="text-dark">{{ product.description }}</span>

                  </div>
                </div>
                <div class="mt-3"></div>

                <div class="mb-3 col-md-6">
                  <label for="address" class="form-label">CREATED AT</label>
                  <h5><i class="bx bx-calendar-plus bx-md text-primary me-3"></i> <strong>{{
                      new Date(product.createdAt).toLocaleString('fr-FR', {
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
                      new Date(product.updatedAt).toLocaleString('fr-FR', {
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
      </div>
    </div>
    <!-- / Content -->


  </div>
  <div class="content-wrapper">
  <div class="container-xxl flex-grow container-p-y">
    <button type="button" @click="exporterPDF(product)" class="btn btn-primary me-2">
      <i class='bx bxs-file-pdf  p-1' ></i>
      Exporter PDF</button>

  </div>
</div>
  <!-- Content wrapper -->
</template>

<script>
import ProductDataService from "@/services/ProductDataService";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

export default {
  name: "details-product",
  data() {
    return {
      product: {
        id: this.$route.params.id,
        name: "",
        slug: "",
        price: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        deleted: false,
        category: "",
      },
    };
  },
  methods: {
    getProduct() {
      ProductDataService.getProduct(this.product.id)
          .then((response) => {
            this.product = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    exporterPDF(product) {
      // Create a new jsPDF instance
      html2canvas(document.querySelector('#pdf-content')).then(canvas => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add the image to the PDF
        doc.addImage(canvas.toDataURL(), 'PNG', 0, 0, 250, 297);

        // Save the PDF
        doc.save(`${product.name}.pdf`);
      });
    },

  },
  mounted() {
    this.getProduct();
  }
}
</script>

<style scoped>

</style>