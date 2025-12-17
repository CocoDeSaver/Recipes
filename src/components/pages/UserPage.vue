<template>
    <div class="container-md my-5 py-5">
        <div class="row g-4">
            <div class="col-lg-3">
                <div class="bg-white rounded-3 shadow-sm p-3 mb-3">
                    <div class="d-flex align-items-center">
                        <img :src="userData.imageLink" alt="Profile" width="56" height="56" class="rounded-circle" style="object-fit: cover;">
                        <div class="ps-3">
                            <p class="my-0 fw-semibold">{{ userData.firstName }} {{ userData.lastName }}</p>
                            <p class="my-0 text-secondary small">{{ userData.email }}</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-3 shadow-sm">
                    <user-menu @change-component="$router.push($event)"></user-menu>
                </div>
            </div>

            <div class="col-lg-9">
                <div class="bg-white rounded-3 shadow-sm p-4">
                    <component :is="component[getroute]"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import UserMenu from "../user/UserMenu.vue";
    import PersonalInfo from "../user/PersonalInfo.vue";
    import FavoriteRecipe from "../user/FavoriteRecipe.vue";
    import UserRecipe from "../user/UserRecipe.vue";

    import { useRoute } from "vue-router";
    import { computed } from "vue";
    import { useStore } from "vuex";

    const store = useStore();
    const userData = computed(() => store.state.auth.userLogin);

    const route = useRoute();

    const component = {
        "personal-info": PersonalInfo,
        "favorite-recipe": FavoriteRecipe,
        "user-recipe": UserRecipe
    }

    const getroute = computed(() => {
        const param = route.params.component;
        
        if (param && component[param]) {
            return param;
        } 

        return "personal-info";
    });
</script>


<style scoped>
.bg-white {
    border: 1px solid #e5e5e5;
}
</style>