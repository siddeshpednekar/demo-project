<template>
  <q-page class="screen-1">
    <div class="user-profile">
      <div class="profile-header">
        <h2>{{ fullname }}</h2>
        <p>{{ designation }}</p>
      </div>
      <div class="profile-details">
        <div class="detail-item">
          <q-icon class="icon" name="person"></q-icon> <span>{{ username }}</span>
        </div>
        <div class="detail-item">
          <q-icon class="icon" name="email"></q-icon> <span>{{ email }}</span>
        </div>
        <div class="detail-item">
          <q-icon class="icon" name="phone"></q-icon> <span>{{ phone }}</span>
        </div>
        <div class="detail-item">
          <q-icon class="icon" name="fingerprint"></q-icon> <span>{{ userid }}</span>
        </div>
      </div>
    </div>
  </q-page>
</template>



<script>
export default {
  name: 'HomePage',
  props: {
    username: String,
    fullname: String,
    email: String,
    phone: String,
    designation: String,
    userid: String
  }
};
</script>

<style scoped>
.screen-1 {
  background: #1e1e1e;
  display:flex;
  justify-content:center;
  align-items:center;
  height:90vh;
}

.user-profile {
  background-color: #1e1e1e;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 30px;
  width: 100%;
  height:100%;
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-header h2 {
  font-size: 24px;
  margin-bottom: 5px;
  background:rgb(1 236 0);
  border-radius:5rem;
  font-weight:bold;
}

.profile-header p {
  color: #ccc;
  font-size: 16px;
}

.profile-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.detail-item {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.detail-item .icon {
  margin-right: 10px;
  font-size: 20px;
  color:rgb(1 236 0);
}
</style>
