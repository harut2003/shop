<template>
  <div>
    <Loader v-if="loading" />
    <v-form v-else v-model="valid" @submit.prevent="login">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        type="password"
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
      <router-link to="/register" class="reg">Not registered yet?</router-link>
      <br />
      <v-btn class="submit-btn" type="submit"> Login </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    loading: false,
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Min 6 symbol",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async login() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      await this.$store.dispatch("login", formData);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.submit-btn {
  background-color: green !important;
}
.reg {
  color: blue;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
