<template>
<div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible" v-if="isLogged">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Meu blog</span>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible" v-if="isLogged">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  computed: mapGetters({
    isLogged: 'login/isLogged',
  }),
  data() {
    return {
      menuVisible: false,
    };
  },
  methods: Object.assign(
    {},
    mapActions({
      restoreLogin: 'login/restoreLogin',

    }),
  ),
  mounted() {
    this.restoreLogin();
  },
};
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 100vh;
  }
</style>
