<script setup>
import NavigationBar from "./NavigationBar.vue";
</script>

<template>
  <header class="site-header">
    <div class="container-fluid">
      <div class="container-md">
        <div class="d-flex justify-content-between align-items-center">
          
          <!-- Logo → Go to Homepage -->
          <router-link 
            :to="{ name: 'homePage' }" 
            class="logo-link"
            aria-label="Go to homepage"
          >
            <img 
              src="@/assets/images/Logo.png" 
              alt="Tasty Recipe Logo" 
              class="logo-image"
            />
          </router-link>

          <!-- Navigation Bar -->
          <NavigationBar />
          
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 0.875rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Logo styling */
.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-link:focus {
  outline: 2px solid #4c4ddc;
  outline-offset: 4px;
  border-radius: 4px;
}

.logo-image {
  height: 40px;
  width: auto;
  display: block;
  object-fit: contain;
}

/* Container adjustments */
.container-fluid {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.container-md {
  max-width: 1200px;
}

/* Header shadow on scroll (optional enhancement) */
.site-header.scrolled {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .site-header {
    padding: 0.75rem 0;
  }
  
  .logo-image {
    height: 36px;
  }
  
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 576px) {
  .site-header {
    padding: 0.625rem 0;
  }
  
  .logo-image {
    height: 32px;
  }
}

/* Ensure content doesn't hide under fixed header */
:global(body) {
  padding-top: 72px; /* Adjust based on actual header height */
}

@media (max-width: 768px) {
  :global(body) {
    padding-top: 68px;
  }
}

@media (max-width: 576px) {
  :global(body) {
    padding-top: 64px;
  }
}
</style>