<script>
	import Form from "./Form.svelte";
	import Instructions from "./Instructions.svelte";
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
		<nav role="navigation" aria-label="main navigation" class="mb-6">
			<Link to="/">Form</Link>
			|
			<Link to="instructions">Instructions</Link>
		</nav>
		<div class="container">
			<Route path="/" component={Form}>
				<Form />
			</Route>
			<Route path="/instructions" component={Instructions}>
				<Instructions />
			</Route>
		</div>
	</main>
</Router>
