<template>
    <div class="container-md my-5 py-5">
        <div class="row g-4">
            <!-- Sidebar -->
            <div class="col-lg-3">
                <!-- User Profile Card -->
                <div class="bg-white rounded-3 shadow-sm p-3 mb-3">
                    <div class="d-flex align-items-center">
                        <img :src="userData.imageLink" alt="Profile" width="56" height="56" class="rounded-circle" style="object-fit: cover;">
                        <div class="ps-3">
                            <p class="my-0 fw-semibold">{{ userData.firstName }} {{ userData.lastName }}</p>
                            <p class="my-0 text-secondary small">{{ userData.email }}</p>
                        </div>
                    </div>
                </div>
                
                <!-- User Menu -->
                <div class="bg-white rounded-3 shadow-sm">
                    <user-menu @change-component="$router.push($event)"></user-menu>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-9">
                <div class="bg-white rounded-3 shadow-sm p-4">
                    <component :is="component[getroute]"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // Pastikan path import ini benar sesuai struktur proyek Anda
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

    // Mapping string parameter URL ke komponen yang diimpor
    const component = {
        "personal-info": PersonalInfo,
        "favorite-recipe": FavoriteRecipe,
        "user-recipe": UserRecipe
    }

    const getroute = computed(() => {
        // 1. Dapatkan parameter dari URL
        const param = route.params.component;
        
        // 2. Jika parameter ditemukan DAN merupakan kunci yang valid di objek 'component'
        if (param && component[param]) {
            return param;
        } 
        
        // 3. Jika parameter tidak ada (misalnya, diakses '/user') atau tidak valid,
        //    maka kembalikan nilai default ("personal-info")
        return "personal-info";
    });
</script>


<style scoped>
.bg-white {
    border: 1px solid #e5e5e5;
}
</style>