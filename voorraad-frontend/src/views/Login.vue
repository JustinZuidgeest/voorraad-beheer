<template>
	<div>
		<div class="form-div">
			<h1>Login</h1>
			<v-form v-model="valid">
				<v-text-field
					v-model="username"
					:rules="usernameRules"
					label="Username"
					required
				></v-text-field>
				<v-text-field
					v-model="password"
					:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="passwordRules"
					:type="showPass ? 'text' : 'password'"
					label="Password"
					hint="At least 6 characters"
					counter
					@click:append="showPass = !showPass"
				></v-text-field>
				<v-btn @click="submitLogin" class="blue white--text">Login</v-btn>
			</v-form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data: () => ({
		valid: false,
		username: '',
		usernameRules: [
			v => v != null || 'Username is required',
		],
		password: '',
		showPass: false,
		passwordRules: [
			v => v != null || 'Password is required',
			v => v.length >= 6 || 'Password must be at least 6 characters'
		]
	}),
	methods: {
		submitLogin() {
			this.$store.dispatch('loginUser', {name: this.username, password: this.password})
			.then((response) => {
				this.$router.push('/');
			})
			.catch(error => console.log(error));
		}
	}
}
</script>

<style scoped>
.form-div {
	max-width: 500px;
  	margin: 0 auto;
	margin-top: 10em;
}
</style>