<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <!-- Menu -->

    <header-vue></header-vue>
      <!-- / Menu -->

      <!-- Layout container -->
      <div class="layout-page">
        <!-- Navbar -->



        <!-- / Navbar -->
          <router-view></router-view>

      </div>
      <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>
  </div>
  <!-- / Layout wrapper -->


</template>

<script>


import HeaderVue from "@/components/Header-vue";
export default {
  name: 'App',
  components: {
    HeaderVue


  }
}
</script>

<style>

</style>
