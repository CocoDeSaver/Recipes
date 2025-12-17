<template>
  <div v-if="recipeDetail && recipeDetail.name" class="my-2 p-4 d-flex flex-column-reverse flex-lg-row justify-content-between border border-secondary-subtle rounded">
    <div class="pe-lg-4">
      <h2>{{ recipeDetail.name }}</h2>
      <p>{{ recipeDetail.description }}</p>

      <!-- Phone -->
      <div class="d-flex d-lg-none flex-column justify-content-between border border-primary rounded bg-color-detail">
        <div class="w-75 my-3 pb-3 mx-auto pe-lg-4 ps-lg-3 border-bottom border-primary">
          <p class="my-0">Preptime</p>
          <p class="my-0">{{ recipeDetail.prepTime }} Mins</p>
        </div>
        <div class="w-75 px-lg-4 pb-3 mx-auto border-bottom border-primary">
          <p class="my-0">Cooktime</p>
          <p class="my-0">{{ recipeDetail.cookTime }} Mins</p>
        </div>
        <div class="w-75 my-3 mx-auto ps-lg-4 pe-3">
          <p class="my-0">Total</p>
          <p class="my-0">{{ totalTime }} Mins</p>
        </div>
      </div>

      <!-- PC -->
      <div class="d-none d-lg-flex flex-lg-row justify-content-between border border-primary rounded bg-color-detail">
        <div class="w-75 my-3 pb-3 mx-auto pe-lg-4 ps-lg-3 border-end border-primary">
          <p class="my-0">Preptime</p>
          <p class="my-0">{{ recipeDetail.prepTime }} Mins</p>
        </div>
        <div class="w-75 my-3 px-lg-4 mx-auto border-end border-primary">
          <p class="my-0">Cooktime</p>
          <p class="my-0">{{ recipeDetail.cookTime }} Mins</p>
        </div>
        <div class="w-75 my-3 mx-auto ps-lg-4 pe-3">
          <p class="my-0">Total</p>
          <p class="my-0">{{ totalTime }} Mins</p>
        </div>
      </div>

      <p class="my-3">Recipe By {{ recipeDetail.username || 'Unknown' }}</p>
      <div>
        <button class="btn fav-btn px-3 py-2 rounded-pill">
          <i class="far fa-heart pe-2"></i>Add To Favorite
        </button>
      </div>
    </div>

    <div class="ps-lg-4">
      <img 
        v-if="recipeDetail.imageLink"
        :src="recipeDetail.imageLink" 
        :alt="recipeDetail.name" 
        class="recipe__detail-img rounded mx-auto" 
        style="object-fit: cover"
      />
      <div 
        v-else 
        class="recipe__detail-img rounded mx-auto bg-secondary d-flex align-items-center justify-content-center"
      >
        <span class="text-white">No Image</span>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center my-5 py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3">Loading recipe...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const recipeDetail = computed(() => store.state.recipe.recipeDetail || {});

const totalTime = computed(() => {
  const prepTime = recipeDetail.value.prepTime || 0;
  const cookTime = recipeDetail.value.cookTime || 0;
  return prepTime + cookTime;
});
</script>

<style scoped>
.recipe__detail-img {
  width: 100%;
  height: 100%;
  
}

.bg-color-detail {
  background-color: #f8f9fa;
}

.fav-btn {
  background-color: #fff;
  border: 2px solid #dc3545;
  color: #dc3545;
  transition: all 0.3s ease;
}

.fav-btn:hover {
  background-color: #dc3545;
  color: #fff;
}
</style>