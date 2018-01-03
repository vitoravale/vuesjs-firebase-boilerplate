<template>
  <md-app-content>
login
      </md-app-content>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: Object.assign(
    {},
    mapActions({
      loginGitHub: 'login/loginWithGithub',
    }),
  ),
};
</script>

<style lang="scss" scoped>

</style>



