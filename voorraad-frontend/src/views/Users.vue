<template>
  	<div>
		<h1>Users</h1>
		<v-simple-table>
			<thead>
				<tr>
					<th class="text-left">
						Name
					</th>
					<th class="text-left">
						Email
					</th>
					<th class="text-left">
						Created at
					</th>
					<th class="text-left">
						Update
					</th>
					<th class="text-left">
						Delete
					</th>
				</tr>
			</thead>
			<tbody>
				<tr	v-for="user in users" :key="user.name">
					<td>{{ user.name }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.created_at }}</td>
					<td>
						<edit-user-popup v-bind:user="user" v-on:userUpdated="fetchUsers()"></edit-user-popup>
					</td>
					<td>
						<v-icon @click="deleteUser(user.id)">mdi-delete</v-icon>
					</td>
				</tr>
			</tbody>
		</v-simple-table>
		<add-user-popup v-on:userCreated="fetchUsers()"></add-user-popup>
		<v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
	</div>
</template>

<script>
import AddUserPopup from '../components/AddUserPopup.vue';
import EditUserPopup from '../components/EditUserPopup.vue';

export default {
    name: 'Users',
  	components: {
		   AddUserPopup,
    EditUserPopup
		},
	data: () => ({
		users: [{
			name: 'placeholder',
			email: 'placeholder@email.com',
			created_at: '00/00/0000'
		}],
		snackbar: false,
		snackbarText: ''
	}),
	methods: {
		fetchUsers() {
			this.$store.dispatch('fetchUsers')
			.then((response) => {
				this.users = response;
			}).catch((error) => console.error(error));
		},
		deleteUser(id){
			this.$store.dispatch('deleteUser', {id: id})
			.then(() => {
				this.flashSnackbar('User deleted');
				this.fetchUsers();
			}).catch((error) => {
				this.flashSnackbar(error.data);
			});
		},
		flashSnackbar(text){
			this.snackbar = true;
			this.snackbarText = text;
			setTimeout(() => {
				this.snackbar = false;
				this.snackbarText = '';
			}, 5000);
		}
	},
	mounted()  {
		if(!this.authenticated){
			this.$router.push('/login');
		}
		else{
			this.fetchUsers();
		}
	},
	computed: {
		authenticated () {
			return this.$store.getters.isAuth;
		},
	}
}
</script>

<style>

</style>