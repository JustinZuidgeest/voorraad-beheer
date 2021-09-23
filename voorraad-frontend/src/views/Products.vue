<template>
	<div>
		<h1>Products</h1>
		<v-simple-table>
			<thead>
				<tr>
					<th class="text-left">
						Name
					</th>
					<th class="text-left">
						Price
					</th>
					<th class="text-left">
						Stock
					</th>
					<th class="text-left">
						Edit
					</th>
					<th class="text-left">
						Delete
					</th>
				</tr>
			</thead>
			<tbody>
				<tr	v-for="product in products" :key="product.name">
					<td>{{ product.name }}</td>
					<td>&#36;{{ product.price }}</td>
					<td>{{ product.stock }}</td>
					<td>
						<edit-product-popup v-bind:product="product" v-on:productUpdated="fetchProducts()"></edit-product-popup>
					</td>
					<td>
						<v-icon @click="deleteProduct(product.id)">mdi-delete</v-icon>
					</td>
				</tr>
			</tbody>
		</v-simple-table>
		<add-product-popup v-on:productCreated="fetchProducts()"></add-product-popup>
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
import AddProductPopup from '../components/AddProductPopup.vue';
import EditProductPopup from '../components/EditProductPopup.vue'

  export default {
  components: { 
		AddProductPopup,
		EditProductPopup
		},
    name: 'Products',

	data: () => ({
		products: [{
			name: 'placeholder',
			price: 0,
			stock: 0
		}],
		snackbar: false,
		snackbarText: ''
	}),
	methods: {
		fetchProducts() {
			this.$store.dispatch('fetchProducts')
			.then((response) => {
				this.products = response;
			}).catch((error) => console.error(error));
		},
		deleteProduct(id){
			this.$store.dispatch('deleteProduct', {id: id})
			.then(() => {
				this.flashSnackbar('Product deleted');
				this.fetchProducts();
			}).catch((error) => {
				console.error(error);
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
			this.fetchProducts();
		}
	},
	computed: {
		authenticated () {
			return this.$store.getters.isAuth;
		},
	}
  }
</script>
