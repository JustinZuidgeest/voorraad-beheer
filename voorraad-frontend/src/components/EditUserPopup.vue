<template>
	<v-dialog max-width="600px" v-model="dialog">

		<template v-slot:activator="{ on, attrs }">
			<v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
		</template>

		<v-card>
			<v-card-title>
				<h2>Edit {{ this.user.name }}</h2>
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
				<v-btn color="blue"	text @click="dialog = false">Close</v-btn>
				<v-btn color="blue" text @click="updateUser">Save</v-btn>
			</v-card-actions>
		</v-card>

	</v-dialog>
</template>

<script>
export default {
	name: 'EditUser',
	props: ['user'],
	data: function(){
		return{
			dialog: false,
			valid: false,
			errorMsg: null,
			name: this.user.name,
			nameRules: [
				v => !!v || 'Username is required',
			],
			email: this.user.email,
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
		}
	},
	methods: {
		updateUser() {
			if (this.$refs.form.validate()){
				this.$store.dispatch('updateUser', {
				id: this.user.id,
				name: this.name,
				email: this.email,
				password: this.password
				})
				.then(() => {
					this.closePopup();
					this.$emit('userUpdated');
				}).catch((error) => {
					this.errorMsg = Object.values(error.data.errors);
				});
			}
		},
		closePopup(){
			this.dialog = false;
			[this.name, this.email, this.password] = [this.user.name, this.user.email, ''];
		}
	}
}
</script>

<style>

</style>