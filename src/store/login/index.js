import firebase from 'firebase';
import debug from 'debug';
import { Notification } from 'element-ui';

// eslint-disable-next-line
const loginSuccess = (commit) => {
  return (result) => {
    debug('store.login')(result);
    commit('setLogin', result.user);
    commit('loginWelcome');
  };
};

// eslint-disable-next-line
const loginError = (commit) => {
  return (error) => {
    debug('store.login')(error);
    commit('loginFail');
  };
};

const mutations = {
  setLogin: (state, data) => {
    state.user = data;
  },
  loginWelcome: (state) => {
    Notification({
      title: 'Olá :)',
      message: `${state.user.displayName}`,
      type: 'success',
    });
  },
  loginWelcomeBack: (state) => {
    Notification({
      title: 'Bem vindo',
      message: `${state.user.displayName}`,
      type: 'success',
    });
  },
  loginFail: () => {
    Notification({
      title: 'Falha',
      message: 'Não foi possível realizar seu acesso',
      type: 'error',
    });
  },
  setFind: (state, data) => {
    state.find = data || false;
  },
};

const actions = {
  loginWithFacebook: ({ commit }) => {
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
      .signInWithPopup(providerFacebook)
      .then(loginSuccess(commit), loginError(commit));
  },
  loginWithGooglePlus: ({ commit }) => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(providerGoogle)
      .then(loginSuccess(commit), loginError(commit));
  },
  loginWithTwitter: ({ commit }) => {
    const providerTwitter = new firebase.auth.TwitterAuthProvider();
    firebase.auth()
      .signInWithPopup(providerTwitter)
      .then(loginSuccess(commit), loginError(commit));
  },
  loginWithGithub: ({ commit }) => {
    const providerGithub = new firebase.auth.GithubAuthProvider();
    firebase.auth()
      .signInWithPopup(providerGithub)
      .then(loginSuccess(commit), loginError(commit));
  },
  restoreLogin: ({ commit }) => {
    commit('setFind', true);
    firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          commit('setLogin', user);
          commit('loginWelcomeBack');
        }
        commit('setFind', false);
      }, () => {
        commit('setFind', false);
      });
  },
  logOut: ({ commit }) => {
    firebase.auth().signOut().then(() => {
      commit('setLogin', null);
    });
  },
};

const getters = {
  isLogged: state => state.user != null,
  loggedUser: state => state.user,
  findPreviousLogin: state => state.find,
};

const state = {
  user: null,
  find: false,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
