<template>
  <div class="row g-4 pt-4">
    <div class="col-lg-3 col-md-4 col-sm-6" v-for="item in recipes" :key="item.id">
      <router-link :to="`/recipe/${item.id}`" class="text-decoration-none text-dark">
        <div class="card h-100 shadow-sm">
          <img class="card-img-top" :src="item.imageLink" :alt="item.name"/>
          <div class="card-body">
            <p class="text-muted small mb-1">{{ item.category }}</p>
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="text-muted small mb-0">Recipe By {{ item.username }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ recipes: { type: Array, required: true } });
</script>

<style scoped>
.card-img-top {height:180px;object-fit:cover;border-radius:6px;}
.card {border-radius:10px;transition:.2s;}
.card:hover {transform:translateY(-5px);}
</style>