<template>
  <div>
    <v-app-bar app color="primary" dark>
		<router-link to="/" class="white--text">Voorraadbeheer</router-link>
		<span></span>
		<div class="welcome" v-if="authenticated">Welcome, {{ username }}</div>
		<v-btn v-if="!authenticated" class="blue white--text" @click="clickLogin">Login</v-btn>
		<v-btn v-if="authenticated" class="blue white--text" @click="clickLogout">Logout</v-btn>
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
			if (this.$route.name != 'Login') {
				this.$router.push('login');
			}
		},
		clickLogout() {
			this.$store.dispatch('logoutUser');
		}
	},
	computed: {
		authenticated () {
			return this.$store.getters.isAuth;
		},
		username () {
			return this.$store.state.username;
		}
	}
  }
</script>
<style scoped>
.welcome {
	margin-right: 16px;
}

span{
	flex: 1;
}

</style>