<script>
	import Form from "./Form.svelte";
	import Step from "./Step.svelte";
	import Instructions from "./Instructions.svelte";
	import Input from "./Input.svelte";
	import Number from "./Number.svelte";
	import Select from "./Select.svelte";
	import Label from "./Label.svelte";
	import Radiobutton from "./Radiobutton.svelte";
	import Textarea from "./Textarea.svelte";
	import Checkbox from "./Checkbox.svelte";
	import structure from "../structure.json";

	const steps = structure.steps;
	const name = "fairRate";
	let showInstructions = false;
	let formSaved = false;
	let submitting = false;
</script>

<style type="text/scss">
	main {
		font-family: "Montserrat", "Gotu", "Lora", serif;
	}
	.header {
		background-color: #efefef;
		padding: 20px;
		margin-bottom: 40px;
	}
	h2 {
		margin-bottom: 40px;
	}
	.container {
		text-align: center;
	}
	.radiobuttons {
		flex-direction: column;
		display: flex;
		text-align: left;
		margin: 0 auto;
		width: 400px;
	}
	.instructions {
		position: absolute;
		top: 30px;
		right: 30px;
		font-size: 14px;
		text-decoration: none;
		color: #333;
	}
</style>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css?family=Gotu|Lato|Lora|Montserrat|Roboto|Merriweather"
		rel="stylesheet" />
</svelte:head>

<main class="main">
	<div class="container">
		<Form
			{name}
			let:store
			let:multi
			{showInstructions}
			saved={formSaved}
			{submitting}>
			{#each steps as step}
				<Step name={step.name} {multi}>
					<div class="header">
						{#if !submitting}
							<h1>{showInstructions ? 'INSTRUCTIONS' : step.title}</h1>
						{/if}
					</div>
					<h2>{step.subtitle ? step.subtitle : ''}</h2>

					{#each step.elements as element}
						{#if element.type === 'text'}
							<Input {store} {element} />
						{:else if element.type === 'number'}
							<Number {store} {element} />
						{:else if element.type === 'textarea'}
							<Textarea {store} {element} />
						{:else if element.type === 'label'}
							<Label text={element.values} />
						{:else if element.type === 'radio'}
							<section class="radiobuttons">
								{#each element.values as value}
									<Radiobutton {store} {value} name={element.name} />
								{/each}
							</section>
						{:else if element.type === 'checkbox'}
							<section class="checkboxes">
								{#each element.values as value}
									<Checkbox
										{store}
										{value}
										name={element.name}
										isConditional={element.isConditional} />
								{/each}
							</section>
						{:else if element.type === 'select'}
							<Select {store} name={element.name} values={element.values} />
						{/if}
					{/each}

					{#if 'conditional-elements' in step}
						{#each step['conditional-elements'] as element}
							{#if element.type === 'text'}
								<Input {store} {element} />
							{:else if element.type === 'number'}
								<Number {store} {element} />
							{:else if element.type === 'textarea'}
								<Textarea {store} {element} />
							{:else if element.type === 'label'}
								<Label text={element.values} />
							{:else if element.type === 'radio'}
								<section class="radiobuttons">
									{#each element.values as value}
										<Radiobutton {store} {value} name={element.name} />
									{/each}
								</section>
							{:else if element.type === 'checkbox'}
								<section class="checkboxes">
									{#each element.values as value}
										<Checkbox {store} {value} name={element.name} />
									{/each}
								</section>
							{:else if element.type === 'select'}
								<Select {store} name={element.name} values={element.values} />
							{/if}
						{/each}
					{/if}
				</Step>
			{/each}
		</Form>
	</div>

	<a
		href="/"
		class="instructions"
		on:click|preventDefault={() => (showInstructions = !showInstructions)}>
		{showInstructions ? 'Close Instructions' : 'Instructions'}
	</a>
</main>

{#if showInstructions && !formSaved}
	<Instructions bind:showInstructions />
{/if}
