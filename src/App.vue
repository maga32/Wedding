<template>
  <div class="row">
    <!-- header -->
    <div class="d-none d-sm-block col-12 py-4 bg-secondary"></div>

    <!-- left -->
    <div class="d-none d-sm-block col-sm-1 col-md-2 col-lg-3 bg-secondary"></div>

    <!-- main -->
    <div class="col-12 col-sm-10 col-md-8 col-lg-6">
      <HomeView />
    </div>

    <!-- right -->
    <div class="d-none d-sm-block col-sm-1 col-md-2 col-lg-3 bg-secondary"></div>

    <!-- footer -->
    <div class="d-none d-sm-block col-12 py-5 bg-secondary"></div>
  </div>
</template>

<script setup>
import {onMounted} from "vue"
import HomeView from "@/views/HomeView.vue"

onMounted(()=> {
  $(document).snowfall({image: "/image/shine1.png", minSize: 10, maxSize: 20, flakeCount: 15})
  $(document).snowfall({image: "/image/shine2.png", minSize: 10, maxSize: 20, flakeCount: 15})
})

</script>

<style>
@font-face {
  font-family: 'one_pretty_night';
  src: url('/font/Cafe24Oneprettynight-v2.0.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'classic_type';
  src: url('/font/Cafe24Classictype-v1.1.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

#app, .font-default {
  font-family: one_pretty_night, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.font-classic {
  font-family: classic_type, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
