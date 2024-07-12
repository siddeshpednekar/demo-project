<template>
  <q-page class="screen-1">
    <form @submit.prevent="login" class="form">
      <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="300"
        height="300"
        viewBox="0 0 640 350"
        xml:space="preserve"
      >
        <g transform="matrix(3.31 0 0 3.31 320.4 240.4)">
          <circle
            style="fill: rgb(1 236 0);"
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(0.98 0 0 0.98 268.7 213.7)">
          <circle
            style="fill: rgb(0, 0, 0);"
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(1.01 0 0 1.01 362.9 210.9)">
          <circle
            style="fill: rgb(0, 0, 0);"
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(0.92 0 0 0.92 318.5 286.5)">
          <circle
            style="fill: rgb(0, 0, 0);"
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(0.16 -0.12 0.49 0.66 290.57 243.57)">
          <polygon
            style="fill: rgb(0, 0, 0);"
            points="-50,-50 -50,50 50,50 50,-50"
          ></polygon>
        </g>
        <g transform="matrix(0.16 0.1 -0.44 0.69 342.03 248.34)">
          <polygon
            style="fill: rgb(0, 0, 0);"
            points="-50,-50 -50,50 50,50 50,-50"
          ></polygon>
        </g>
      </svg>

      <div class="email">
        <label for="email">Username</label>
        <div class="sec-2">
          <ion-icon name="mail-outline"></ion-icon>
          <q-input
            v-model="email"
            type="email"
            name="email"
            placeholder="Username"
            outlined
            dense
            :rules="[val => !!val || 'Username is required']"
          />
        </div>
      </div>

      <div class="password">
        <label for="password">Password</label>
        <div class="sec-2">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <q-input
            v-model="password"
            type="password"
            name="password"
            placeholder="············"
            outlined
            dense
            :rules="[val => !!val || 'Password is required']"
          />
          <ion-icon class="show-hide" name="eye-outline"></ion-icon>
        </div>
      </div>

      <q-btn class="login" label="Login" @click="login" />

      <div class="footer">
        <span>Sign up</span>
        <span>Forgot Password?</span>
      </div>

      <div v-if="loading" class="loader">
        <div class="spinner"></div>
      </div>
    </form>
  </q-page>
</template>



<script>
import { useDataStore } from "../stores/userData.js";
import { Notify } from "quasar";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      loading: false, 
    };
  },
  methods: {
    async login() {
      this.loading = true;


      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Email:", this.email);
      console.log("Password:", this.password);

      const dataStore = useDataStore();
      const users = dataStore.users;

      const foundUser = users.find((user) => user.username === this.email);
      if (!foundUser) {
        console.error("User not found!");
        this.$nextTick(() => {
          Notify.create({
            message: "User not found!",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
        });
      } else if (foundUser.password === this.password) {
        const route = foundUser.designation === "admin" ? "/dashboardadmin/admin" : "/userdashboard/user";
        this.$router.push({
          path: route,
          query: {
            username: foundUser.username,
            fullname: foundUser.fullname,
            email: foundUser.email,
            phone: foundUser.phone,
            designation: foundUser.designation,
            userid: foundUser.userid,
          },
        });

        this.$nextTick(() => {
          Notify.create({
            message: `Welcome ${foundUser.fullname}`,
            color: "positive",
            position: "top",
            timeout: 2000,
          });
        });
      } else if (foundUser.password != this.password) {
        console.error("Incorrect password");
        this.$nextTick(() => {
          Notify.create({
            message: "Incorrect password",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
        });
      }

      this.loading = false;  
    },
  },
};
</script>

<style scoped>
.screen-1 {
  background: url('test.gif');
  background-repeat:no-repeat;
  background-color:#000;
  background-size:40% 100%;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.form {
  background: #333;
  border-radius: 30px;
  padding: 1.5rem;
  color: #fff;
  animation: slideIn 1s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.logo {
  margin-top: -3em;
  animation: fadeInScale 1s ease-out;
}

@keyframes fadeInScale {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.email,
.password {
  background: #fff;
  box-shadow: 0 0 2em rgba(0, 0, 0, 0.5);
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 20px;
  color: #000;
  margin-top: 1em;
  transition: all 0.3s ease;
}

.email q-input:focus,
.password q-input:focus {
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
}

.email q-input,
.password q-input {
  outline: none;
  border: none;
  font-size: 0.9em;
  color: #000;
  background: #fff;
}

.email input::placeholder,
.password input::placeholder {
  color: #aaa;
  font-size: 0.9em;
}

.sec-2 ion-icon {
  color: #fff;
  margin-bottom: -0.2em;
}

.password .show-hide {
  margin-right: -5em;
  color: #fff;
}

.login {
  margin-top: 1em;
  font-weight: 600;
  border-radius: 30px;
  background: rgb(1 236 0);
  color: #fff;
  width: 100%;
  margin-top: 1.5rem;
  transition: background 0.3s ease;
}

.login:hover {
  background: rgb(0, 200, 0);
}

.footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.7em;
  color: #5f5f5f;
  gap: 14em;
}

.input {
  color: #000;
}

.footer span {
  cursor: pointer;
  color: #fff;
  padding: 1.5rem 0rem;
  transition: color 0.3s ease;
}

.footer span:hover {
  color: rgb(1 236 0);
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
