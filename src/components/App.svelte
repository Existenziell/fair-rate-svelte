<script>
	import Form from "./Form.svelte";
	import { Router, Route, Link } from "svelte-routing";
	export let url = ""; //This property is necessary to avoid ignore the Router
</script>

<style type="text/scss">
	.main {
		display: grid;
	}
	.container {
		padding: 50px 80px;
	}
</style>

<Router {url}>
	<main class="main">
		<div class="container">
			<Route path="/" component={Form}>
				<Form />
			</Route>
		</div>
	</main>
</Router>
