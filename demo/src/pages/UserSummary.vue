<template>
  <div>
    <div class="form-section">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Full Name:</strong> {{ user.fullname }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone Number:</strong> {{ user.phone }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p>
      <p><strong>Designation:</strong> {{ user.designation }}</p>
      <p v-if="user.designation === 'user'"><strong>User ID:</strong> {{ user.userid }}</p>
    </div>

    <q-btn @click="createUser" label="Create New User" class="submit-button" />
  </div>
</template>

<script>
export default {
  name: 'UserSummary',
  props: {
    user: Object
  },
  methods: {
    createUser() {
      this.$emit('create-user');
    }
  }
};
</script>
