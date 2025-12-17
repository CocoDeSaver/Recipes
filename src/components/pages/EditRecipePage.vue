<template>
  <main>
    <div class="container-md my-5 py-5">
      <recipe-form
        v-if="detailData && !isLoading"
        :isEdit="true"
        :recipeData="detailData"
      ></recipe-form>

      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-5">
        <p>Loading recipe data...</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import RecipeForm from "../../recipeForm/RecipeForm.vue"; // Sesuaikan path

const store = useStore();
const route = useRoute();

const detailData = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;

  try {
    // PERBAIKAN: Gunakan route.params.id (dari /user/:component/:id)
    const recipeId = route.params.id;

    // PERBAIKAN: Sesuaikan dengan namespace Vuex Anda
    await store.dispatch("recipe/getRecipeDetail", recipeId);

    // PERBAIKAN: Sesuaikan dengan state path Anda
    detailData.value = store.state.recipe.recipeDetail;
    console.log(detailData.value);
  } catch (error) {
    console.error("Error loading recipe:", error);
    alert("Failed to load recipe data");
  } finally {
    isLoading.value = false;
  }
});
</script>