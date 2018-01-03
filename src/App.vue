<template>
<el-container style="height: 100%;" v-loading.fullscreen.lock="findPreviousLogin">
  <el-aside v-if="isLogged" width="200px" style="background-color: rgb(238, 241, 246); min-height: 100vh">
    <el-menu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>Navigator One</template>
        <el-menu-item-group>
          <template slot="title">Group 1</template>
          <el-menu-item index="1-1">Option 1</el-menu-item>
          <el-menu-item index="1-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="1-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">Option4</template>
          <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
        <el-menu-item-group>
          <template slot="title">Group 1</template>
          <el-menu-item index="2-1">Option 1</el-menu-item>
          <el-menu-item index="2-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="2-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">Option 4</template>
          <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
        <el-menu-item-group>
          <template slot="title">Group 1</template>
          <el-menu-item index="3-1">Option 1</el-menu-item>
          <el-menu-item index="3-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="3-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">Option 4</template>
          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown v-if="isLogged" class="user" >
        <img :src="loggedUser.photoURL" :alt="loggedUser.displayName" class="user-image" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">Sair</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-else class="login" >
        <span>Login</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginGitHub">Github</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  computed: mapGetters({
    isLogged: 'login/isLogged',
    loggedUser: 'login/loggedUser',
    findPreviousLogin: 'login/findPreviousLogin',
  }),
  data() {
    return {
    };
  },
  methods: Object.assign(
    {
    },
    mapActions({
      restoreLogin: 'login/restoreLogin',
      logOut: 'login/logOut',
      loginGitHub: 'login/loginWithGithub',
    }),
  ),
  mounted() {
    this.restoreLogin();
  },
};
</script>

<style lang="scss" scoped>
  $header-height: 60px;
  body {
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: $header-height;
  }

  .el-aside {
    color: #333;
  }
  .user {
    padding-top: 14px;
    height: $header-height - 14px;
    cursor: pointer;
    &-image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
</style>
