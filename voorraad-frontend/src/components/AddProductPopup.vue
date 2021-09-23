<template>
	<v-dialog max-width="600px" v-model="dialog">

		<template v-slot:activator="{ on, attrs }">
			<v-btn color="blue white--text" v-bind="attrs" v-on="on">Add Product</v-btn>
		</template>

		<v-card>
			<v-card-title>
				<h2>Add new Product</h2>
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
				<v-btn color="blue" text @click="clickSave">Save</v-btn>
			</v-card-actions>
		</v-card>

	</v-dialog>
</template>

<script>
export default {
	name: 'AddProduct',
	data: function(){
		return{
			dialog: false,
			valid: false,
			errorMsg: null,
			name: '',
			nameRules: [
				v => !!v || 'Name is required',
			],
			price: '',
			priceRules: [
				v => !!v || 'Price is required',
				v => v >= 0  || "Price should be above 0",
    		v => v <= 999.99 || "Price should be lower than 999.99",
			],
			stock: '',
			stockRules: [
				v => !!v || 'Stock is required',
				v => v >= 0  || "Stock should be above 0",
				v => v <= 999999999 || "Stock should be lower than 999999999"
			]
		}
	},
	methods: {
		clickSave(){
			if (this.$refs.form.validate()){
				this.$store.dispatch('storeProduct', {
					name: this.name,
					price: parseFloat(this.price),
					stock: parseInt(this.stock)
				})
				.then(() => {
					this.$emit('productCreated');
					this.closePopup();
				})
				.catch((error) => {
					this.errorMsg = Object.values(error.data.errors);
				});
			}
		},
		closePopup(){
			this.errorMsg = null;
			this.$refs.form.resetValidation();
			this.dialog = false;
			[this.name, this.price, this.stock] = ['', '', ''];
		}
	}
}
</script>

<style>

</style>