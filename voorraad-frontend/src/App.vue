<template>
  <v-app>
    <v-main>
      <v-container>
        <navbar/>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';


export default {
  components: {
    Navbar
  },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
