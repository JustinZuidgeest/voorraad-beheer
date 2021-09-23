<template>
	<v-dialog max-width="600px" v-model="dialog">

		<template v-slot:activator="{ on, attrs }">
			<v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
		</template>

		<v-card>
			<v-card-title>
				<h2>Edit {{ this.product.name }}</h2>
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
						v-model="price"
						:rules="priceRules"
						label="Price"
						type="number"
						required
					></v-text-field>
					<v-text-field
						v-model="stock"
						:rules="stockRules"
						label="Stock"
						type="number"
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
				<v-btn color="blue" text @click="updateProduct">Save</v-btn>
			</v-card-actions>
		</v-card>

	</v-dialog>
</template>

<script>
export default {
	name: 'EditProduct',
	props: ['product'],
	data: function(){
		return{
			dialog: false,
			valid: false,
			errorMsg: null,
			name: this.product.name,
			nameRules: [
				v => !!v || 'Name is required',
			],
			price: this.product.price,
			priceRules: [
				v => v >= 0  || "Price should be above 0",
    		v => v <= 999.99 || "Price should be lower than 999.99",
			],
			stock: this.product.stock,
			stockRules: [
				v => v >= 0  || "Stock should be above 0",
				v => v <= 999999999 || "Stock should be lower than 999999999"
			]
		}
	},
	methods: {
		updateProduct() {
			if (this.$refs.form.validate()){
				this.$store.dispatch('updateProduct', {
				id: this.product.id,
				name: this.name,
				price: parseFloat(this.price),
				stock: parseInt(this.stock)
				})
				.then(() => {
					this.$emit('productUpdated');
					this.closePopup();
				}).catch((error) => {
					this.errorMsg = Object.values(error.data.errors);
				});
			}
		},
		closePopup(){
			this.dialog = false;
			[this.name, this.price, this.stock] = [this.product.name, this.product.price ,this.product.stock];
		}
	}
}
</script>

<style>

</style>