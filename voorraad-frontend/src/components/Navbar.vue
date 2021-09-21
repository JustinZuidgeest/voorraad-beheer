<template>
  <div>
    <v-app-bar app color="primary" dark>
		<v-app-bar-title>Voorraadbeheer</v-app-bar-title>
		<router-link to='/' class="white--text mx-6" style="text-decoration: none;"><v-icon>mdi-view-dashboard</v-icon>Products</router-link>
		<router-link to='/users' class="white--text mx-6" style="text-decoration: none;"><v-icon>mdi-account-circle</v-icon>Users</router-link>
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
			this.$router.push('login');
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