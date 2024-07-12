<template>
  <q-form @submit="submitForm" ref="form">
    <div class="form-section">
      <q-input
        v-model="localUser.username"
        label="Username"
        outlined
        dense
        :rules="usernameRules"
      />
      <q-input
        v-model="localUser.fullname"
        label="Full Name"
        outlined
        dense
        :rules="fullnameRules"
      />
      <q-input
        v-model="localUser.email"
        label="Email"
        outlined
        dense
        type="email"
        :rules="emailRules"
      />
      <q-input
        v-model="localUser.phone"
        label="Phone Number"
        outlined
        dense
        type="tel"
        :rules="phoneRules"
      />
      <q-input
        v-model="localUser.password"
        label="Password"
        outlined
        dense
        type="password"
        :rules="passwordRules"
      />
    </div>
    <q-btn type="submit" label="Next" class="submit-button" />
  </q-form>
</template>

<script>
import { useDataStore } from '../stores/userdata'; 

export default {
  name: 'UserDetailsForm',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localUser: { ...this.user },
      usernameError: ''
    };
  },
  computed: {
    usernameRules() {
      return [
        val => !!val || 'Username is required',
        () => this.usernameError || true
      ];
    },
    fullnameRules() {
      return [val => !!val || 'Full Name is required'];
    },
    emailRules() {
      return [
        val => !!val || 'Email is required',
        val => /.+@.+\..+/.test(val) || 'Email must be valid'
      ];
    },
    phoneRules() {
      return [
        val => !!val || 'Phone Number is required',
        val => /^\d{10}$/.test(val) || 'Phone Number must be 10 digits'
      ];
    },
    passwordRules() {
      return [
        val => !!val || 'Password is required',
        val => val.length >= 8 || 'Password must be at least 8 characters',
        val => /[A-Z]/.test(val) || 'Password must contain at least one uppercase letter',
        val => /[a-z]/.test(val) || 'Password must contain at least one lowercase letter',
        val => /[0-9]/.test(val) || 'Password must contain at least one number',
        val => /[!@#$%^&*(),.?":{}|<>]/.test(val) || 'Password must contain at least one special character'
      ];
    }
  },
  methods: {
    async validateUsername() {
      const isUnique = await this.checkUsernameUnique(this.localUser.username);
      if (!isUnique) {
        this.usernameError = 'Username is already taken';
      } else {
        this.usernameError = '';
      }
    },
    checkUsernameUnique(username) {
      const store = useDataStore();
      return !store.users.some(user => user.username === username);
    },
    async submitForm() {
      await this.validateUsername();
      this.$refs.form.validate().then(success => {
        if (success && !this.usernameError) {
          this.$emit('update-user', this.localUser);
          this.$emit('next');
        }
      });
    }
  },
  watch: {
    'localUser.username': 'validateUsername'
  }
};
</script>

<style>
.submit-button {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  background-color: rgb(1 236 0);
  color: #fff;
}
</style>
