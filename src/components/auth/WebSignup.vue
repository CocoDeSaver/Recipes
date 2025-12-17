<template>
  <div class="signup-wrapper">
    <div class="signup-container shadow">
      <div class="text-center mb-4">
        <img src="../../assets/images/Logo.png" alt="Logo" class="signup-logo" />
        <h2 class="mt-3 fw-bold">Create your account</h2>
        <p class="text-muted">Enter your details to use all the app features.</p>
      </div>

      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label fw-semibold">First Name</label>
            <input 
              type="text"
              class="form-control input-modern"
              placeholder="Ex : Jack"
              v-model="signupData.firstName"
              required
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label fw-semibold">Last Name</label>
            <input 
              type="text"
              class="form-control input-modern"
              placeholder="Ex : Sparrow"
              v-model="signupData.lastName"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Username</label>
          <input 
            type="text"
            class="form-control input-modern"
            placeholder="Your Username"
            v-model="signupData.username"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input 
            type="email"
            class="form-control input-modern"
            placeholder="Your Email"
            v-model="signupData.email"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Password</label>
          <input 
            type="password"
            class="form-control input-modern"
            placeholder="Your Password"
            v-model="signupData.password" 
            @input="passwordCheck"
            required
          />
          <p v-show="passwordStatusDisplay" class="text-danger mt-1 fw-medium" style="font-size:11px">
            The password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
          </p>
        </div>

        <div class="mb-4">
          <label class="form-label fw-semibold">Confirm Password</label>
          <input 
            type="password"
            class="form-control input-modern"
            placeholder="Confirm Your Password"
            v-model="signupData.confirmPassword"
            @input="confirmationPasswordCheck"
            required
          />
          <p v-show="confirmationPasswordDoesNotMatch" class="text-danger mt-1 fw-medium" style="font-size: 11px">
            Passwords do not match.
          </p>
          <p v-show="confirmationPasswordMatch" class="text-success mt-1 fw-medium" style="font-size: 11px">
            Passwords match.
          </p>
        </div>

        <div class="my-4">
          <label class="form-label fw-semibold">Profile Photo</label>
          <input 
            type="file" 
            class="form-control input-modern" 
            accept="image/*"
            @change="checkImage" 
          />

          <div class="position-relative d-flex justify-content-center mt-3">
            <div class="profile-photo-wrapper">
              <img 
                :src="signupData.imageLink || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23ddd%22 width=%22120%22 height=%22120%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EPhoto%3C/text%3E%3C/svg%3E'" 
                class="profile-photo" 
                alt="Profile" 
              />
            </div>

            <div class="camera-icon position-absolute">
              <i class="fa-solid fa-camera"></i>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          class="btn btn-signup w-100 rounded-pill"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Signing Up...' : 'Sign Up' }}
        </button>
      </form>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have an account?
          <span class="login-link" @click="goToLogin">Login</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

const store = useStore();
const router = useRouter();

const signupData = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLogin: false,
  imageLink: "",
});

const passwordStatusDisplay = ref(false);
const confirmationPasswordDoesNotMatch = ref(false);
const confirmationPasswordMatch = ref(false);
const isSubmitting = ref(false);

const isPasswordValid = (password) => {
  if (password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasLetter && hasNumber && hasSpecial;
};

const passwordCheck = () => {
  passwordStatusDisplay.value = !isPasswordValid(signupData.password);
  
  if (signupData.confirmPassword) {
    confirmationPasswordCheck();
  }
};

const confirmationPasswordCheck = () => {
  if (signupData.confirmPassword === "") {
    confirmationPasswordDoesNotMatch.value = false;
    confirmationPasswordMatch.value = false;
    return; 
  }
  
  if (signupData.password !== signupData.confirmPassword) {
    confirmationPasswordDoesNotMatch.value = true;
    confirmationPasswordMatch.value = false;
    return;
  }

  confirmationPasswordDoesNotMatch.value = false;
  confirmationPasswordMatch.value = true;
};

const checkImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  });
};

const register = async () => {
  if (!signupData.firstName || !signupData.lastName || !signupData.username || !signupData.email) {
    alert("Please fill in all required fields");
    return;
  }

  if (!isPasswordValid(signupData.password)) {
    passwordStatusDisplay.value = true;
    alert("Password must be at least 8 characters and contain letters, numbers, and special characters");
    return;
  }

  if (signupData.password !== signupData.confirmPassword) {
    confirmationPasswordDoesNotMatch.value = true;
    alert("Passwords do not match");
    return;
  }
  
  try {
    isSubmitting.value = true;
    
    await store.dispatch("auth/getRegisterData", signupData);
    
    alert("Registration successful! Please login with your credentials.");
    router.push("/login");
    
  } catch (error) {
    console.error("Registration failed:", error);
    
    let errorMessage = "Registration failed. ";
    
    if (error.response?.data?.error?.message) {
      const firebaseError = error.response.data.error.message;
      
      if (firebaseError.includes("EMAIL_EXISTS")) {
        errorMessage += "This email is already registered.";
      } else if (firebaseError.includes("INVALID_EMAIL")) {
        errorMessage += "Invalid email format.";
      } else if (firebaseError.includes("WEAK_PASSWORD")) {
        errorMessage += "Password is too weak (minimum 6 characters).";
      } else {
        errorMessage += firebaseError;
      }
    } else if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += "Please try again.";
    }
    
    alert(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

const goToLogin = () => router.push("/login");
</script>

<style scoped>
.signup-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.signup-container {
  background: #ffffff;
  padding: 40px 35px;
  border-radius: 14px;
  width: 100%;
  max-width: 620px;
}

.signup-logo {
  width: 90px;
}

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

.btn-signup {
  background-color: #4c4ddc;
  color: white;
  padding: 12px 0;
  font-weight: 600;
  transition: 0.2s ease-in-out;
}

.btn-signup:hover:not(:disabled) {
  background-color: #393acc;
}

.btn-signup:disabled {
  background-color: #9999dc;
  cursor: not-allowed;
}

.login-link {
  color: #4c4ddc;
  cursor: pointer;
  margin-left: 5px;
}

.login-link:hover {
  text-decoration: underline;
}

.profile-photo-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  border: 2px solid #e3e3e3;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-icon {
  bottom: 0;
  right: 32%;
  transform: translateY(20%);
  background: white;
  padding: 8px;
  border-radius: 50%;
  font-size: 1.1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
</style>