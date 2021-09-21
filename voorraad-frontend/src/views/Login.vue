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
					@click:append="showPass = !showPass"
				></v-text-field>

				<v-alert dense outlined v-if="errorMsg" type="error">
					{{ errorMsg }}
				</v-alert>

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
		],
		errorMsg: ''
	}),
	methods: {
		submitLogin() {
			this.$store.dispatch('loginUser', {name: this.username, password: this.password})
			.then(() => {
				this.$router.push('/');
			}).catch((error) => {
				console.error(error);
				this.errorMsg = error.data;
				setTimeout(() => this.errorMsg = '', 5000)
			});
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