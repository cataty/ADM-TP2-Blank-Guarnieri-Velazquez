<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Application Bar</v-app-bar-title>
      <router-link to="/"><v-btn text="Home"</v-btn></router-link>
      <router-link to="/favourites"><v-btn text="Favourites"</v-btn></router-link>
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
v-btn{
  color:#fff;
}
</style>
