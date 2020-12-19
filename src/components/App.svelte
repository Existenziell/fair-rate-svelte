<script>
	import Form from "./Form.svelte";
	import Step from "./Step.svelte";
	import Input from "./Input.svelte";
	import Select from "./Select.svelte";
	import Label from "./Label.svelte";
	import RadioButton from "./RadioButton.svelte";
	import Textarea from "./Textarea.svelte";
	import structure from "../structure.json";

	const steps = structure.steps;
	const name = "formdata";
</script>

<style type="text/scss">
	h1 {
		margin-bottom: 40px;
		background-color: #efefef;
		padding: 20px;
	}
	h2 {
		margin-bottom: 40px;
	}
	.container {
		padding: 50px 80px;
		text-align: center;
	}
	.radiobuttons {
		flex-direction: column;
		display: flex;
		text-align: left;
		margin: 0 auto;
		width: 400px;
	}
</style>

<main class="main">
	<div class="container">
		<Form {name} let:store let:multi>
			{#each steps as step}
				<Step name={step.name} {multi}>
					<h1>{step.title}</h1>
					<h2>{step.subtitle}</h2>

					{#each step.elements as e}
						{#if e.type === 'text'}
							<Input {store} name={e.name} placeholder={e.placeholder} />
						{:else if e.type === 'textarea'}
							<Textarea {store} name={e.name} placeholder={e.placeholder} />
						{:else if e.type === 'label'}
							<Label text={e.values} />
						{:else if e.type === 'radio'}
							<section class="radiobuttons">
								{#each e.values as value}
									<RadioButton {store} {value} name={e.name} />
								{/each}
							</section>
						{:else if e.type === 'select'}
							<Select {store} name={e.name} values={e.values} />
						{/if}
					{/each}
				</Step>
			{/each}
		</Form>
	</div>
</main>
