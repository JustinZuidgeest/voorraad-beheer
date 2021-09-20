<template>
	<div>
		<h1>Homepage</h1>
	</div>
</template>

<script>
import Login from './Login.vue'

  export default {
    name: 'Home',

    components: {
        Login
    },
	mounted()  {
		if(!this.$store.getters.isAuth){
			this.$router.push('/login');
		}
	}
  }
</script>
