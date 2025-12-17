<template>
  <div class="container-md my-5 py-5">
    <div class="recipe__title text-center">
      <h2>All Recipe</h2>

      <p style="font-size: 15px">
        Find and share everyday cooking inspiration on Allrecipes.
        Discover recipes, cooks, videos, and how-tos based on the food you love
        and the friends you follow.
      </p>
    </div>

    <!-- Render hanya jika data sudah ada -->
    <recipe-list
      :recipes="recipeList"
      v-if="recipeListStatus"
    ></recipe-list>
  </div>
</template>

<script setup>
import RecipeList from "../recipe/RecipeList.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const recipeList = computed(() => store.state.recipe.recipes);

const recipeListStatus = computed(() => recipeList.value.length > 0);

onMounted(async () => {
  await store.dispatch("recipe/getRecipeData");
});
</script>

<style scoped>
.recipe__title h2 {
  font-weight: 600;
}
</style>