<template>
  <router-view/>
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
