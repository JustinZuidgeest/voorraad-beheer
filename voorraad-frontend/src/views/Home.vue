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
				</tr>
			</thead>
			<tbody>
				<tr	v-for="product in products" :key="product.name">
					<td>{{ product.name }}</td>
					<td>&#36;{{ product.price }}</td>
					<td>{{ product.stock }}</td>
				</tr>
			</tbody>
		</v-simple-table>
	</div>
</template>

<script>

  export default {
    name: 'Home',

	data: () => ({
		products: [{
			name: 'placeholder',
			price: 0,
			stock: 0
		}],
	}),
	methods: {
		fetchProducts() {
			this.$store.dispatch('fetchProducts')
			.then((response) => {
				this.products = response;
			}).catch((error) => console.error(error));
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
