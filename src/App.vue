<template>
  <v-app>
    <v-app-bar :elevation="2" class="navbar">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-app-bar-title>MyMovieFavs</v-app-bar-title>
      <router-link to="/" class="nav-link"><v-btn text="Home"</v-btn></router-link>
      <router-link to="/favourites" class="nav-link"><v-btn text="Favourites"</v-btn></router-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>

<style>
.navbar{
  background:#f8f8fc !important;
}

.nav-link{
  color:#1565C0 !important;
}
</style>
