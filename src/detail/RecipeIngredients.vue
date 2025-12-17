<template>
    <div class="my-3">
        <div class="card">
            <div class="card-header">
                <p class="fs-4 my-0 fw-semibold">Ingredients</p>
            </div>
            <div class="card-body">
                <ul class="mb-0" v-if="recipeDetail?.ingredients?.length">
                    <li v-for="(ingredient, index) in recipeDetail.ingredients" :key="index">
                        {{ ingredient }}
                    </li>
                </ul>
                <p v-else class="text-muted mb-0">No ingredients available</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";

    const store = useStore();
    const recipeDetail = computed(() => store.state.recipe.recipeDetail);
</script>