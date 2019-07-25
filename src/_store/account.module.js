import { authService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });
        authService.login(email, password).then().catch(e => {
            console.log(e.error_description);
            commit('loginFailure', e.error_description);
            dispatch('alert/error', e.error_description, { root: true });
        });
    },
    logout({ commit }) {
        //authService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
        authService.signup(user)
            .then(
                () => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful. Please Log in.', { root: true });
                    })
                })
            .catch(
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', (error.error_description || error.description), { root: true });
                }
            );
    },
    changePassword({ dispatch, commit }, user) {
        commit('changePasswordRequest', user);
        authService.changePassword(user)
            .then(
                (resp => {
                    commit('changePasswordSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', resp, { root: true });
                    })
                }))
            .catch(
                error => {
                    commit('changePasswordFailure', error);
                    dispatch('alert/error', (error.error_description || error.description), { root: true });
                }
            );
    }

};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    },
    changePasswordRequest(state, user) {
        state.status = { changingPassword: true };
    },
    changePasswordSuccess(state, user) {
        state.status = {};
    },
    changePasswordFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};