<template>
  <q-page class="admin-dashboard">
    <div class="form-container">
      <h2 class="form-title">New User Details</h2>
      <component :is="currentStepComponent"
                 :user="newUser"
                 @next="goToNextStep"
                 @update-user="updateUser"
                 @create-user="createUser" />
    </div>
  </q-page>
</template>

<script>
import UserDetailsForm from './UserDetailsForm.vue';
import UserDesignationForm from './UserDesignationForm.vue';
import UserSummary from './UserSummary.vue';
import { useDataStore } from '../stores/userData.js';
import { Notify } from 'quasar';

export default {
  name: 'AdminDashboardPage',
  components: {
    UserDetailsForm,
    UserDesignationForm,
    UserSummary
  },
  data() {
    return {
      currentStep: 1,
      newUser: {
        username: '',
        fullname: '',
        email: '',
        phone: '',
        password:'',
        designation: '',
        userid: ''
      }
    };
  },
  computed: {
    currentStepComponent() {
      switch (this.currentStep) {
        case 1:
          return UserDetailsForm;
        case 2:
          return UserDesignationForm;
        case 3:
          return UserSummary;
        default:
          return UserDetailsForm;
      }
    }
  },
  methods: {
    goToNextStep() {
      this.currentStep++;
    },
    updateUser(updatedUser) {
      this.newUser = { ...updatedUser };
    },
    createUser() {
      const dataStore = useDataStore();
      dataStore.addUser({ ...this.newUser });

      Notify.create({
        message: `User ${this.newUser.fullname} created successfully!`,
        color: 'positive',
        position: 'top',
        timeout: 3000
      });

      this.newUser = {
        username: '',
        fullname: '',
        email: '',
        phone: '',
        password:'',
        designation: '',
        userid: ''
      };

      this.currentStep = 1; 
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
}

.form-container {
  background-color: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  width: 100%;
  color: #000;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  text-align:center;
  margin-bottom: 1em;
  color: #000;
}

.form-section {
  margin-bottom: 2em;
  background:#fff;
}

.q-input, .q-select {
  margin-bottom: 1em;
  background: #fff;
  color: #000;
}

.q-input::placeholder, .q-select::placeholder {
  color: #888;
}

.submit-button {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  background-color: #540654;
  color: white;
}
</style>
