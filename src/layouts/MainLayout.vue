<template>
  <div>
    <Loader v-if="loading" />
    <div v-show="!loading">
      <v-card color="grey lighten-4" flat tile>
        <v-toolbar class="menu" extended>
          <v-container class="cont">
            <div class="header">
              <div>
                <span>Am</span>
                <country-flag class="flag" country="am" size="small" />
              </div>
              <div>
                <v-icon>mdi-map-marker</v-icon>
                <span>Yerevan</span>
              </div>
              <div>
                <span>Free shipping</span>
              </div>
            </div>
            <div class="footer">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Wildberries</v-toolbar-title>

              <v-text-field
                label="Search"
                prepend-inner-icon="mdi-magnify"
                append-icon="mdi-camera"
                class="search"
              ></v-text-field>
              <v-spacer></v-spacer>

              <v-btn class="no-back">
                Upload
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>

              <v-btn v-if="!user" class="no-back" to="/login">
                Account
                <v-icon>mdi-account</v-icon>
              </v-btn>
              <div v-else>
                <span class="username"
                  >{{ user.firstname }} {{ user.lastname }}</span
                >
                <v-btn class="logout-btn" @click="logout">Log out</v-btn>
              </div>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </div>
          </v-container>
        </v-toolbar>
      </v-card>
      <v-container>
        <router-view />
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-layout",

  computed: {
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .v-toolbar__content {
    display: flex;
    flex-direction: column;
    align-items: unset;
  }
  .v-toolbar__title {
    display: inline;
    text-transform: uppercase;
    color: white;
    margin-left: 20px;
    font-weight: bold;
  }
  .v-btn__content {
    color: white;
    display: flex;
    flex-direction: column;
  }
  // .v-text-field__details {
  //   display: none;
  // }
  .v-toolbar__extension {
    display: none;
  }
}
.v-input__slot {
  margin-bottom: 0;
}
.logout-btn {
  background-color: blue !important;
  margin-left: 15px;
}
.v-btn {
  cursor: pointer;
}
.header,
.footer {
  display: flex;
  align-items: center;
}
.cont {
  padding-bottom: 20px;
}
.no-back {
  background-color: transparent !important;
  box-shadow: none;
}
.footer {
  margin-top: 20px;
}
.username {
  color: white;
}
.search {
  margin-left: 140px;
}
.v-app-bar__nav-icon {
  border-radius: 10px;
  border: 1px solid white;
}

.menu {
  background: linear-gradient(to right, #cb11ab 0, #481173 100%) no-repeat;
}
</style>
