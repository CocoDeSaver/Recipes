<template>
  <div>
    <WebHeader />
    <router-view></router-view>
    <WebFooter />
  </div>
</template>

<script>
import WebHeader from "./components/header/WebHeader.vue";
import HomePage from "./components/pages/HomePage.vue";
import WebFooter from "./components/footer/WebFooter.vue";

export default {
  name: "App",
  components: {
    WebHeader,
    HomePage,
    WebFooter,
  },
};  
</script>
<style></style>