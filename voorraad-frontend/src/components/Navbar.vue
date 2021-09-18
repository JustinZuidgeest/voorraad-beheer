<template>
  <div>
    <v-app-bar app color="primary" dark>
		<router-link to="/" class="white--text">Voorraadbeheer</router-link>
		<v-btn right fixed class="blue white--text" @click="clickLogin">Login</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',

    data: () => ({
      
    }),
	methods: {
		clickLogin() {
			this.$router.push('login');
		}
	}
  }
</script>
