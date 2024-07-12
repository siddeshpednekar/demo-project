<template>
  <q-form @submit="submitForm" ref="form">
    <div class="form-section">
      <q-select
        v-model="localUser.designation"
        :options="designations"
        label="Designation"
        outlined
        dense
        :rules="[val => !!val || 'Designation is required']"
      />
      <q-input
        v-if="localUser.designation === 'user'"
        v-model="localUser.userid"
        label="User ID"
        outlined
        dense
        :rules="useridRules"
      />
    </div>
    <q-btn type="submit" label="Next" class="submit-button" />
  </q-form>
</template>

<script>
import { useDataStore } from '../stores/userdata'; 

export default {
  name: 'UserDesignationForm',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localUser: { ...this.user },
      designations: ['admin', 'user'],
      useridError: ''
    };
  },
  computed: {
    useridRules() {
      return [
        val => !!val || 'User ID is required',
        val => Number.isInteger(+val) || 'User ID must be an integer',
        () => this.useridError || true
      ];
    }
  },
  methods: {
    async validateUserId() {
      if (this.localUser.designation === 'user') {
        const isUnique = await this.checkUserIdUnique(this.localUser.userid);
        if (!isUnique) {
          this.useridError = 'User ID is already taken';
        } else {
          this.useridError = '';
        }
      } else {
        this.useridError = '';
      }
    },
    checkUserIdUnique(userid) {
      const store = useDataStore();
      return !store.users.some(user => user.userid === userid);
    },
    async submitForm() {
      await this.validateUserId();
      this.$refs.form.validate().then(success => {
        if (success && !this.useridError) {
          this.$emit('update-user', this.localUser);
          this.$emit('next');
        }
      });
    }
  },
  watch: {
    'localUser.userid': 'validateUserId'
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
