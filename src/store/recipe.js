import axios from 'axios';

export default {
    namespaced: true,

    state() {
        return {
            recipes: [],
            recipeDetail: null,
        };
    },

    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        },

        setRecipeDetail(state, payload) {
            state.recipeDetail = payload;
        },

        setNewRecipe(state, payload) {
            state.recipes.push(payload);
        },

        updateRecipeInList(state, payload) {
            const index = state.recipes.findIndex(recipe => recipe.id === payload.id);
            if (index !== -1) {
                state.recipes[index] = payload;
            }
            if (state.recipeDetail && state.recipeDetail.id === payload.id) {
                state.recipeDetail = payload;
            }
        },
    },

    actions: {
        async getRecipeDetail({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://vue-js-project-b9029-default-rtdb.firebaseio.com/recipes/${payload}.json`
                );
                commit('setRecipeDetail', { id: payload, ...data }); // Tambahkan id
            } catch (err) {
                console.log(err);
            }
        },

        async getRecipeData({ commit }) {
            try {
                const { data } = await axios.get(
                    'https://vue-js-project-b9029-default-rtdb.firebaseio.com/recipes.json'
                );

                const arr = [];
                for (let key in data) {
                    arr.push({ id: key, ...data[key] });
                }

                commit('setRecipes', arr);
            } catch (err) {
                console.log(err);
            }
        },

        async addNewRecipe({ commit, rootState }, payload) {
            const newData = {
                ...payload,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                likes: ["null"],
                userId: rootState.auth.userLogin.userId,
            };

            try {
                const { data } = await axios.post(
                    `https://vue-js-project-b9029-default-rtdb.firebaseio.com/recipes.json?auth=${rootState.auth.token}`,
                    newData
                );

                commit('setNewRecipe', { id: data.name, ...newData });
            } catch (err) {
                console.log(err);
            }
        },

        async updateRecipe({ commit, rootState }, payload) {
            const { id, ...recipeData } = payload; 

            const updatedData = {
                ...recipeData,
                username: rootState.auth.userLogin.username,
                userId: rootState.auth.userLogin.userId,
            };

            try {
                await axios.put(
                    `https://vue-js-project-b9029-default-rtdb.firebaseio.com/recipes/${id}.json?auth=${rootState.auth.token}`,
                    updatedData
                );

                commit('updateRecipeInList', { id, ...updatedData });
                
                return { success: true };
            } catch (err) {
                console.error('Error updating recipe:', err);
                throw err;
            }
        },

        async deleteRecipe({ dispatch, rootState }, payload) {
            try {
                await axios.delete(
                    `https://vue-js-project-b9029-default-rtdb.firebaseio.com/recipes/${payload}.json?auth=${rootState.auth.token}`
                );
                await dispatch('getRecipeData');
            } catch (err) {
                console.log(err);
            }
        }
    },
};