<template>
  <div>
    login
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      isCollapse: true,
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



