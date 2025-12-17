<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div
        class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center"
      >
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Recipe</p>
          <p class="my-0 text-secondary">Add your original recipe here</p>
        </div>
        <div>
          <button
            class="btn add-btn px-3 py-2 rounded-pill"
            @click="goToNewRecipePage"
          >
            <i class="fa-solid fa-circle-plus pe-2"></i>Add Recipe
          </button>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
      <div class="row">
        <user-recipe-card
          v-for="recipe in recipes"
          :key="recipe._id"
          :recipe="recipe"
          :buttonName="['Delete', 'Edit']"
          @delete="handleDelete(recipe._id)"
        >
          <p>{{ new Date(recipe.createdAt).toDateString() }}</p>
        </user-recipe-card>

        <!-- Tampilkan pesan jika tidak ada recipe -->
        <div v-if="recipes.length === 0" class="col-12 text-center py-5">
          <p class="text-secondary">You haven't created any recipe yet</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import UserRecipeCard from "./UserRecipeCard.vue";

const store = useStore();
const router = useRouter();

const recipes = computed(() => {
  const allRecipe = store.state.recipe.recipes;
  const userId = store.state.auth.userLogin.userId;
  return allRecipe.filter((recipe) => recipe.userId === userId);
});



// Fungsi untuk ke halaman add recipe
const goToNewRecipePage = () => {
  router.push("/new-recipe");
};

// Fungsi untuk delete recipe
const handleDelete = async (recipeId) => {
  if (confirm("Are you sure you want to delete this recipe?")) {
    try {
      await store.dispatch("recipe/deleteRecipe", recipeId);
      alert("Recipe deleted successfully!");
    } catch (error) {
      alert("Failed to delete recipe");
    }
  }
};

watch(recipes, () => {
  store.dispatch("recipe/getRecipeData");
});
</script>

<style scoped>
.add-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #ff5252;
  color: white;
}
</style>