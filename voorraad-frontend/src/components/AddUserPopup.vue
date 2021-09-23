<template>
  <div>
	<v-dialog max-width="600px" v-model="dialog">
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="blue white--text" v-bind="attrs" v-on="on">Add User</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<h2>Add new User</h2>
			</v-card-title>
			<v-card-text>
				<v-form v-model="valid" ref="form">
					<v-text-field
						v-model="name"
						:rules="nameRules"
						label="Name"
						required
					></v-text-field>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="Email"
						type="email"
						required
					></v-text-field>
					<v-text-field
						v-model="password"
						:rules="passwordRules"
						label="Password"
						:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPass ? 'text' : 'password'"
						@click:append="showPass = !showPass"
						counter
						required
					></v-text-field>
				</v-form>
				<v-alert dense outlined v-if="errorMsg" type="error">
					<ul>
						<div v-for="array in errorMsg" v-bind:key="array[0]">
							<li v-for="error in array" v-bind:key="error">
								{{ error }}
							</li>
						</div>
					</ul>
				</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue"	text @click="closePopup">Close</v-btn>
				<v-btn color="blue" text @click="clickSave">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
  </div>
</template>

<script>
export default {
	name: 'AddUser',
	data: () => ({
		dialog: false,
		valid: false,
		errorMsg: null,
		name: '',
		nameRules: [
			v => !!v || 'Username is required',
		],
		email: '',
		emailRules: [
			v => !!v || 'Email is required',
			v => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(v) || 'Invalid e-mail.'
			}
		],
		password: '',
		showPass: false,
		passwordRules: [
			v => !!v || 'Password is required',
			v => v.length >= 6 || 'Password must be at least 6 characters'
		],
	}),
	methods: {
		clickSave(){
			if (this.$refs.form.validate()){
				this.$store.dispatch('storeUser', {name: this.name, email: this.email, password: this.password})
				.then(() => {
					this.closePopup();
					this.errorMsg = null;
					this.$refs.form.resetValidation()
					this.$emit('userCreated');
				})
				.catch((error) => {
					this.errorMsg = Object.values(error.data.errors);
				});
			}
		},
		closePopup(){
			this.dialog = false;
			[this.name, this.email, this.password] = ['','',''];
		}
	}
}
</script>

<style>

</style>