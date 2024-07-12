<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header" elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer"></q-btn>
        <q-toolbar-title>
          <span class="custom">Demo</span>App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer class="sidebar" show-if-above v-model="leftDrawerOpen" side="left">
      <q-list>
        <q-item class="item" clickable v-ripple @click="goToLogin">
          <q-item-section>
            <q-icon name="login" class="icon"/>
          </q-item-section>
          <q-item-section>
            Login
          </q-item-section>
        </q-item>
        <!-- Add more navigation items here -->
      </q-list>
    </q-drawer>

    <q-page-container class="main">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    goToDashboard() {
      this.$router.push('/user/admin');
    },
    goToLogin(){
      this.$router.push('/');
    }
  }
}
</script>
<style>
.header{
    background:#1e1e1e;
    color:rgb(1 236 0);
    box-shadow: 0 0 2em rgba(0, 0, 0, 0.5)
}
.custom{
  color:#fff;
}
.sidebar{
    background:#333;
    color:#000;
}
.main{
    background:#fff;
}
.item{
  background:rgb(1 236 0);
  margin:1rem 0.5rem;
  border-radius:5rem;
}
.icon{
  color:#1e1e1e;
}
</style>