<template>
  <li class="list-group-item">
    <form @submit.prevent="addNewRecipe">
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <div class="mb-3">
            <BaseInput type="file" identity="recipeImage" label="Photo Recipe" @input="checkImage" />
            <div v-if="recipeData.imageLink">
              <img :src="recipeData.imageLink" :alt="recipeData.name" class="image" />
            </div>
          </div>
          <div class="mb-3">
            <BaseInput type="text" identity="recipeTitle" placeholder="Give your recipe a title" label="Recipe Title" v-model="recipeData.name" />
          </div>
          <div class="mb-3">
            <BaseTextArea identity="recipeDescription" label="Description" placeholder="Share story behind recipe and what is make it special" v-model="recipeData.description" />
          </div>
          <div class="mb-3">
            <label class="fw-semibold">Recipe Category <span style="color: #cb3a31">*</span></label>
            <BaseSelect id="recipeCategory" :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']" v-model="recipeData.category" />
          </div>
        </div>
      </div>
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Time Setting</p>
        <div>
          <div class="mb-3">
            <BaseInput type="number" identity="prepTime" placeholder="0" label="Prep Time" v-model="recipeData.prepTime" @input="calculateTotalTime" />
          </div>
          <div class="mb-3">
            <BaseInput type="number" identity="cookTime" placeholder="0" label="Cook Time" v-model="recipeData.cookTime" @input="calculateTotalTime" />
          </div>
          <div class="mb-3">
            <BaseInput type="number" identity="totalTime" placeholder="0" label="Total Time" v-model="recipeData.totalTime" readonly />
          </div>
        </div>
      </div>
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Ingredients</p>
        <p>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).</p>
        <div>
          <div class="mb-3 row" v-for="count in ingredientCount" :key="count">
            <div class="col-lg-11 col-11">
              <BaseInput type="text" identity="ingredient" label="Ingredient" placeholder="Ex: 1 cup sugar" v-model="recipeData.ingredients[count - 1]" />
            </div>
            <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient" style="color: #cb3a31; cursor: pointer" @click="deleteIngredient(count - 1)">
              <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <BaseButton class="new-ingredient-btn px-3 py-2" type="button" @click="addIngredient">
          <i class="fa-solid fa-plus me-2"></i>Add More
        </BaseButton>
      </div>
      <div class="border-top my-3">
        <p class="my-3 fs-5 fw-semibold">Directions</p>
        <p>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe</p>
        <div>
          <div class="mb-3 row" v-for="count in directionCount" :key="count">
            <div class="col-lg-11 col-11">
              <BaseInput type="text" identity="direction" label="Direction" placeholder="Ex: Preheat oven to 350°F" v-model="recipeData.directions[count - 1]" />
            </div>
            <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient" style="color: #cb3a31; cursor: pointer" @click="deleteDirection(count - 1)">
              <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <BaseButton class="new-ingredient-btn px-3 py-2" type="button" @click="addDirection">
          <i class="fa-solid fa-plus me-2"></i>Add More
        </BaseButton>
      </div>
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <BaseButton class="cancel-btn px-3 py-2 ms-1" type="button" @click="router.push('/user/user-recipe')">Cancel</BaseButton>
        <BaseButton class="submit-recipe-btn px-3 py-2 ms-1" type="submit">{{ isEdit ? 'Update' : 'Submit' }}</BaseButton>
      </div>
    </form>
  </li>
</template>

<script setup>
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextArea from '@/components/ui/BaseTextArea.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { reactive, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  isEdit: { type: Boolean, default: false }
});

const store = useStore();
const router = useRouter();

let recipeData = reactive({
  id: null, // ✅ Tambahkan id
  imageLink: '',
  name: '',
  description: '',
  category: '',
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [],
  directions: [],
  username: '',
  userId: '',
  createdAt: null,
  likes: [],
});

const ingredientCount = ref(1);
const directionCount = ref(1);

// ✅ PERBAIKAN: Ambil data dari store menggunakan computed
const storeRecipeDetail = computed(() => store.state.recipe?.recipeDetail || null);

// ✅ PERBAIKAN: Watch store recipeDetail untuk mode edit
watch(
  storeRecipeDetail,
  (newDetail) => {
    if (props.isEdit && newDetail) {
      console.log('Loading recipe data:', newDetail);
      
      // Load SEMUA data ke recipeData (termasuk field yang tidak boleh diubah)
      recipeData.id = newDetail.id; // ✅ PENTING
      recipeData.imageLink = newDetail.imageLink || '';
      recipeData.name = newDetail.name || '';
      recipeData.description = newDetail.description || '';
      recipeData.category = newDetail.category || '';
      recipeData.prepTime = newDetail.prepTime || 0;
      recipeData.cookTime = newDetail.cookTime || 0;
      recipeData.totalTime = newDetail.totalTime || 0;
      recipeData.username = newDetail.username || '';
      recipeData.userId = newDetail.userId || '';
      recipeData.createdAt = newDetail.createdAt || null;
      recipeData.likes = newDetail.likes || [];
      
      // Load ingredients
      if (newDetail.ingredients && Array.isArray(newDetail.ingredients)) {
        recipeData.ingredients = [...newDetail.ingredients];
        ingredientCount.value = newDetail.ingredients.length;
      }
      
      // Load directions
      if (newDetail.directions && Array.isArray(newDetail.directions)) {
        recipeData.directions = [...newDetail.directions];
        directionCount.value = newDetail.directions.length;
      }
    }
  },
  { immediate: true, deep: true }
);

const addIngredient = () => {
  ingredientCount.value++;
};

const addDirection = () => {
  directionCount.value++;
};

const checkImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener('load', () => {
    recipeData.imageLink = reader.result;
  });
};

const deleteIngredient = (index) => {
  if (ingredientCount.value > 1) {
    recipeData.ingredients.splice(index, 1);
    ingredientCount.value--;
  }
};

const deleteDirection = (index) => {
  if (directionCount.value > 1) {
    recipeData.directions.splice(index, 1);
    directionCount.value--;
  }
};

const calculateTotalTime = () => {
  recipeData.totalTime = parseInt(recipeData.prepTime || 0) + parseInt(recipeData.cookTime || 0);
};

const addNewRecipe = async () => {
  // Filter out empty ingredients and directions
  const cleanedData = {
    ...recipeData,
    ingredients: recipeData.ingredients.filter(i => i && i.trim() !== ''),
    directions: recipeData.directions.filter(d => d && d.trim() !== ''),
  };

  console.log('Submitting recipe:', cleanedData);

  try {
    if (props.isEdit) {
      await store.dispatch('recipe/updateRecipe', cleanedData);
      alert('Recipe updated successfully!');
    } else {
      await store.dispatch('recipe/addNewRecipe', cleanedData);
      alert('Recipe added successfully!');
    }
    
    router.push('/user/user-recipe');
  } catch (error) {
    console.error('Error saving recipe:', error);
    alert('Failed to save recipe. Please try again.');
  }
};
</script>

<style scoped>
.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 10px;
}

.new-ingredient-btn {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
}

.new-ingredient-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

.submit-recipe-btn {
  background-color: #cb3a31;
  color: white;
  border: none;
  border-radius: 5px;
}

.submit-recipe-btn:hover {
  background-color: #a52f28;
}

.delete-ingredient:hover {
  opacity: 0.7;
}
</style>