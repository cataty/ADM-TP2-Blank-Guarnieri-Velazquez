<template>
  <v-app>
    <v-app-bar :elevation="2" class="navbar">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <img src="/src/assets/mymovieApp-logo.png" alt="logo" class="logo">
      <v-app-bar-title class="title font-weight-bold text-blue-darken-4">MyMovieFavs</v-app-bar-title>
      <router-link to="/" class="nav-link text-blue-darken-3"><v-btn text="Home"</v-btn></router-link>
      <router-link to="/favourites" class="nav-link text-blue-darken-3"><v-btn text="Favoritos"</v-btn></router-link>
    </v-app-bar>
    <v-main class="main">
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
  padding:0 2rem;
}

.logo{
  height:40px;
  width: auto;
}
</style>
