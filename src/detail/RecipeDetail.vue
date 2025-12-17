<template>
    <div>
        <RecipeDescription />
        <RecipeDirections />
        <RecipeIngredients />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RecipeDescription from "@/detail/RecipeDescription.vue";
import RecipeDirections from "@/detail/RecipeDirections.vue";
import RecipeIngredients from "@/detail/RecipeIngredients.vue";

const route = useRoute();
const store = useStore();


const recipeId = route.params.id;

onMounted(async () => {
  await store.dispatch("recipe/getRecipeDetail", recipeId);
});
</script>