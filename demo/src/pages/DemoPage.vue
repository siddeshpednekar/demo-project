<template>
  <q-page class="screen-1">
    <div class="demo-app">
      <h1><span class="custom">Demo</span>App</h1>
    </div>
    <div class="spinner-container">
      <q-spinner-hourglass size="80px" color="white" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

setTimeout(() => {
  router.push('/login');
}, 2000);
</script>

<style scoped>
.screen-1 {
  background: #1e1e1e;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-app {
  color: rgb(1, 236, 0);
  background: rgb(1, 236, 0);
  border-radius: 100%;
}

.demo-app h1 {
  font-size: 3em;
  font-weight: bold;
  padding: 2rem;
  background: #fff;
}

.custom {
  color: #000;
}
</style>
