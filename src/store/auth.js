import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    namespaced: true,

    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: null,
            isLogin: false,
        };
    },

    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set('tokenExpirationDate', expiresIn);
            Cookies.set('jwt', idToken);
        },
        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
        },
        setUserLogout(state) {
            state.token = null;
            state.userLogin = null;
            state.isLogin = false;
            state.tokenExpirationDate = null;
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        }
    },

    actions: {
        async getLoginData({ commit, dispatch }, payload) {
            const APIkey = import.meta.env.VITE_FIREBASE_API_KEY;
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                });

                commit('setToken', {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });

                await dispatch('getUser', data.localId);

                return { success: true };
            } catch (error) {
                console.error("Login error:", error);
                
                if (error.response?.data?.error?.message) {
                    const firebaseError = error.response.data.error.message;
                    
                    if (firebaseError.includes("INVALID_LOGIN_CREDENTIALS") || 
                        firebaseError.includes("INVALID_PASSWORD") ||
                        firebaseError.includes("EMAIL_NOT_FOUND")) {
                        throw new Error("Invalid email or password");
                    } else if (firebaseError.includes("USER_DISABLED")) {
                        throw new Error("This account has been disabled");
                    } else {
                        throw new Error(firebaseError);
                    }
                }
                
                throw new Error("Login failed. Please try again.");
            }
        },

        async getRegisterData({ commit, dispatch }, payload) {
            const APIkey = import.meta.env.VITE_FIREBASE_API_KEY;
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                });

                commit('setToken', {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });

                const newUserData = {
                    userId: data.localId,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    username: payload.username,
                    email: payload.email,
                    imageLink: payload.imageLink || ""
                };

                Cookies.set("UID", newUserData.userId);

                await dispatch('addNewUser', newUserData);

                return { success: true, data: newUserData };
            } catch (error) {
                console.error("Registration error:", error);
                
                if (error.response?.data?.error?.message) {
                    const firebaseError = error.response.data.error.message;
                    
                    if (firebaseError.includes("EMAIL_EXISTS")) {
                        throw new Error("This email is already registered");
                    } else if (firebaseError.includes("INVALID_EMAIL")) {
                        throw new Error("Invalid email format");
                    } else if (firebaseError.includes("WEAK_PASSWORD")) {
                        throw new Error("Password must be at least 6 characters");
                    } else {
                        throw new Error(firebaseError);
                    }
                }
                
                throw new Error("Registration failed. Please try again.");
            }
        },
    
        async addNewUser({ commit, state }, payload) {
            const databaseURL = "https://vue-js-project-b9029-default-rtdb.firebaseio.com";
            
            try {
                const { data } = await axios.post(
                    `${databaseURL}/user.json?auth=${state.token}`,
                    payload
                );
                
                commit("setUserLogin", { 
                    userData: payload, 
                    loginStatus: true 
                });

                return { success: true, data };
            } catch (error) {
                console.error("Database save error:", error.response?.data || error.message);
                
                if (error.response?.status === 401) {
                    throw new Error("Database permission denied. Check Firebase Rules.");
                }
                
                throw new Error("Failed to save user data");
            }
        },

        async getUser({ commit, state }, userId) {
            const databaseURL = "https://vue-js-project-b9029-default-rtdb.firebaseio.com";
            
            try {
                const { data } = await axios.get(
                    `${databaseURL}/user.json?auth=${state.token}`
                );
                
                if (!data) {
                    throw new Error("No user data found");
                }

                for (let key in data) {
                    if (data[key].userId === userId) {
                        Cookies.set("UID", data[key].userId);
                        commit("setUserLogin", { 
                            userData: data[key], 
                            loginStatus: true 
                        });
                        return;
                    }
                }

                throw new Error("User not found in database");
            } catch (error) {
                console.error("Error fetching user:", error);
                throw new Error("Failed to fetch user data");
            }
        },

        logout({ commit }) {
            commit('setUserLogout');
        }
    },

    getters: {
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return state.isLogin && state.token !== null;
        },
        userLogin(state) {
            return state.userLogin;
        }
    }
};