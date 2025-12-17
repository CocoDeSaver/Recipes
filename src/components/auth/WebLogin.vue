<template>
  <div class="login-wrapper">
    <div class="login-container shadow">

      <!-- Header -->
      <div class="text-center mb-4">
        <img src="../../assets/images/Logo.png" alt="Logo" class="login-logo" />
        <h2 class="mt-3 fw-bold">Log in to your account</h2>
        <p class="text-muted">Welcome back! Please enter your details.</p>
      </div>

      <!-- Form -->
      <form class="mt-4" @submit.prevent="login">

        <!-- Email -->
        <div class="my-3">
          <label class="form-label fw-semibold">Email</label>
          <input 
            type="email" 
            class="form-control input-modern"
            placeholder="Enter your email"
            v-model="loginData.email"
            required
          />
        </div>

        <!-- Password -->
        <div class="my-3">
          <label class="form-label fw-semibold">Password</label>
          <input 
            type="password" 
            class="form-control input-modern"
            placeholder="Enter your password"
            v-model="loginData.password"
            required
          />
        </div>

        <!-- Button -->
        <button 
          type="submit" 
          class="btn btn-login w-100 mt-3 py-2"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>

      <!-- Signup Link -->
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don't have an account?
          <router-link 
            :to="{ name: 'signupPage' }" 
            class="signup-link"
          >
            Signup
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const loginData = reactive({
  email: '',
  password: '',
  isLogin: true
});

const isLoading = ref(false);

const login = async () => {
  if (!loginData.email || !loginData.password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    isLoading.value = true;
    
    await store.dispatch("auth/getLoginData", loginData);
    
    router.push("/");
  } catch (error) {
    console.error("Login error:", error);
    
    let errorMessage = "Login failed. ";
    
    if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += "Please check your credentials.";
    }
    
    alert(errorMessage);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* WRAPPER */
.login-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

/* CARD */
.login-container {
  background: #ffffff;
  padding: 40px 35px;
  border-radius: 14px;
  width: 100%;
  max-width: 420px;
}

/* LOGO */
.login-logo {
  width: 90px;
}

/* INPUT MODERN */
.input-modern {
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid #dcdcdc;
  transition: all 0.25s ease;
}

.input-modern:focus {
  border-color: #4c4ddc;
  box-shadow: 0 0 0 3px rgba(76, 77, 220, 0.15);
}

/* BUTTON LOGIN */
.btn-login {
  background-color: #4c4ddc;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.2s ease-in-out;
}

.btn-login:hover:not(:disabled) {
  background-color: #393acc;
}

.btn-login:disabled {
  background-color: #9999dc;
  cursor: not-allowed;
}

/* SIGNUP LINK */
.signup-link {
  color: #4c4ddc;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>