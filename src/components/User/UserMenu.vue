<template>
  <div class="col-lg-3 mb-4">
    <ul class="list-group">
      <li class="list-group-item">
        </li>
      
      <li class="list-group-item user-menu"
      @click="menuClicked('personal-info')">
        <i class="fa-solid fa-user pe-2"></i>Personal Info
      </li>
      <li class="list-group-item user-menu"
      @click="menuClicked('favorite-recipe')">
        <i class="fas fa-heart pe-2"></i>Favorited Recipes
      </li>
      <li class="list-group-item user-menu"
      @click="menuClicked('user-recipe')">
        <i class="fa-solid fa-burger pe-2"></i>My Recipe
      </li>
    </ul>
  </div>
</template>

<script setup>
    // 1. Ubah ke kebab-case agar cocok dengan template induk (@change-component)
    const emit = defineEmits(['change-component']); 

    const menuClicked = option => {
        // 2. Kirim PATH URL lengkap, bukan hanya nama komponen
        const fullPath = `/user/${option}`;
        emit('change-component', fullPath);
    }
</script>

<style scoped>
/* ... style tetap sama ... */
</style>