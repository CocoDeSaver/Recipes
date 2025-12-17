<template>
  <div class="profile-dropdown">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a 
          class="nav-link dropdown-toggle d-flex align-items-center gap-2 py-2 px-3" 
          href="#" 
          role="button" 
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa-solid fa-user" style="color: #4c4ddc"></i>
          <span class="fw-semibold">My Profile</span>
        </a>
        
        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
          <!-- User Info Section -->
          <li class="px-3 py-2 border-bottom" v-if="userInfo">
            <p class="mb-0 fw-semibold small">{{ userInfo.username || userInfo.firstName }}</p>
            <p class="mb-0 text-muted" style="font-size: 0.75rem">{{ userInfo.email }}</p>
          </li>
          
          <!-- Menu Items -->
          <li>
            <router-link to="/user/personal-info" class="dropdown-item py-2">
              <i class="fa-solid fa-user me-2" style="width: 20px"></i>
              My Profile
            </router-link>
          </li>
          
          <li>
            <router-link to="/user/favorite-recipe" class="dropdown-item py-2">
              <i class="fa-solid fa-heart me-2" style="width: 20px"></i>
              Favorited Recipes
            </router-link>
          </li>
          
          <li>
            <router-link to="/user/user-recipe" class="dropdown-item py-2">
              <i class="fa-solid fa-book me-2" style="width: 20px"></i>
              My Recipes
            </router-link>
          </li>
          
          <li><hr class="dropdown-divider my-1" /></li>
          
          <li>
            <a class="dropdown-item py-2 text-danger" href="#" @click.prevent="handleLogout">
              <i class="fa-solid fa-right-from-bracket me-2" style="width: 20px"></i>
              Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore();
const router = useRouter();

// ✅ Get user info from store
const userInfo = computed(() => store.state.auth?.userLogin || null);

// ✅ PERBAIKAN: Nama action yang benar adalah 'auth/logout' bukan 'auth/setUserlogout'
const handleLogout = async () => {
  try {
    // Dispatch action logout
    await store.dispatch("auth/logout");
    
    // Redirect ke login page
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
    // Tetap redirect meskipun ada error
    router.push("/login");
  }
};
</script>

<style scoped>
.profile-dropdown {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #212529;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.nav-link:hover {
  color: #4c4ddc;
  background-color: #f8f9fa;
}

.dropdown-menu {
  min-width: 240px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  border-radius: 12px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  border-radius: 6px;
  margin: 0 0.25rem;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  padding-left: 1.25rem;
}

.dropdown-item.text-danger:hover {
  background-color: #fff5f5;
  color: #dc3545 !important;
}

.dropdown-item i {
  color: #6c757d;
  text-align: center;
}

.dropdown-item.text-danger i {
  color: #dc3545;
}

/* Remove default dropdown arrow styling */
.dropdown-toggle::after {
  margin-left: 0.5rem;
}

/* Active route styling */
.dropdown-item.router-link-active {
  background-color: #f0f0ff;
  color: #4c4ddc;
}

.dropdown-item.router-link-active i {
  color: #4c4ddc;
}

/* User info section */
.border-bottom {
  border-color: rgba(0, 0, 0, 0.08) !important;
}

/* Mobile responsive */
@media (max-width: 576px) {
  .dropdown-menu {
    min-width: 200px;
  }
  
  .nav-link span {
    display: none;
  }
}
</style>