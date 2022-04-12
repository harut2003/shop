<template>
  <v-form v-model="valid" @submit.prevent="register">
    <v-text-field
      v-model="firstname"
      :rules="nameRules"
      :counter="10"
      label="First name"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastname"
      :rules="nameRules"
      :counter="10"
      label="Last name"
      required
    ></v-text-field>

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
    <v-text-field
      type="password"
      v-model="confirmPassword"
      :rules="confirmPasswordRules"
      label="Confirm password"
      required
    ></v-text-field>
    <v-btn type="submit" class="register-btn">Register</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    confirmPassword: "",
    email: "",
    password: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Min 6 symbol",
    ],
  }),
  computed: {
    confirmPasswordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Min 6 symbol",
        (v) => v === this.password || "Passwords doesnt",
      ];
    },
  },
  methods: {
    register() {
      const formdata = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch("register", formdata);
    },
  },
};
</script>

<style lang="scss" scoped>
.register-btn {
  background-color: green !important;
}
</style>
