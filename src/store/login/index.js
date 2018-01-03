import firebase from 'firebase';
import debug from 'debug';
import ms from 'ms';

// eslint-disable-next-line
const loginSuccess = (commit) => {
  return (result) => {
    debug('store.login')(result);
    commit('setLogin', result.user);
    commit('loginWelcome', result.user.displayName);
    setTimeout(() => {
      commit('loginWelcome', null);
    }, ms('10s'));
  };
};

// eslint-disable-next-line
const loginError = (commit) => {
  return (error) => {
    debug('store.login')(error);
    commit('loginFail', true);
    setTimeout(() => {
      commit('loginFail', false);
    }, ms('10s'));
  };
};

const mutations = {
  setLogin: (state, data) => {
    state.user = data;
  },
  loginWelcome: (state, data) => {
    state.welcomeMessage = data && data.length ? `Bem vindo ${data}` : null;
  },
  loginWelcomeBack: (state, data) => {
    state.welcomeMessage = data && data.length ? `Bem vindo de volta ${data}` : null;
  },
  loginFail: (state, data) => {
    state.loginError = data || false;
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
    firebase.auth()
      .onAuthStateChanged((user) => {
        commit('setLogin', user);
        commit('loginWelcomeBack', user.displayName);
        setTimeout(() => {
          commit('loginWelcomeBack', null);
        }, ms('10s'));
      }, loginError(commit));
  },
  logOut: ({ commit }) => {
    commit('setLogin', null);
  },
};

const getters = {
  isLogged: state => state.user != null,
  loggedUser: state => state.user,
};

const state = {
  user: null,
  welcomeMessage: null,
  loginError: false,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
