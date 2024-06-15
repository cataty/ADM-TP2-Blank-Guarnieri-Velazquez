<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Application Bar</v-app-bar-title>
      <router-link to="/home">Home</router-link>
      <router-link to="/favourites">Favourites</router-link>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>

<style>
</style>
