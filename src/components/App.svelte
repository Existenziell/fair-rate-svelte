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
</script>

<style type="text/scss">
	main {
		font-family: "Montserrat", "Gotu", "Lora", serif;
	}
	h1 {
		margin-bottom: 40px;
		background-color: #efefef;
		padding: 20px;
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
		<Form {name} let:store let:multi {showInstructions}>
			{#each steps as step}
				<Step name={step.name} {multi}>
					<h1>{showInstructions ? 'INSTRUCTIONS' : step.title}</h1>
					<h2>{step.subtitle ? step.subtitle : ''}</h2>

					{#each step.elements as e}
						{#if e.type === 'text'}
							<Input {store} name={e.name} placeholder={e.placeholder} />
						{:else if e.type === 'number'}
							<Number {store} name={e.name} placeholder={e.placeholder} />
						{:else if e.type === 'textarea'}
							<Textarea {store} name={e.name} placeholder={e.placeholder} />
						{:else if e.type === 'label'}
							<Label text={e.values} />
						{:else if e.type === 'radio'}
							<section class="radiobuttons">
								{#each e.values as value}
									<Radiobutton {store} {value} name={e.name} />
								{/each}
							</section>
						{:else if e.type === 'checkbox'}
							<section class="checkboxes">
								{#each e.values as value}
									<Checkbox
										{store}
										{value}
										name={e.name}
										isConditional={e.isConditional} />
								{/each}
							</section>
						{:else if e.type === 'select'}
							<Select {store} name={e.name} values={e.values} />
						{/if}
					{/each}

					{#if 'conditional-elements' in step}
						{#each step['conditional-elements'] as c}
							{#if c.type === 'text'}
								<Input {store} name={c.name} placeholder={c.placeholder} />
							{:else if c.type === 'number'}
								<Number {store} name={c.name} placeholder={c.placeholder} />
							{:else if c.type === 'textarea'}
								<Textarea {store} name={c.name} placeholder={c.placeholder} />
							{:else if c.type === 'label'}
								<Label text={c.values} />
							{:else if c.type === 'radio'}
								<section class="radiobuttons">
									{#each c.values as value}
										<Radiobutton {store} {value} name={c.name} />
									{/each}
								</section>
							{:else if c.type === 'checkbox'}
								<section class="checkboxes">
									{#each c.values as value}
										<Checkbox {store} {value} name={c.name} />
									{/each}
								</section>
							{:else if c.type === 'select'}
								<Select {store} name={c.name} values={c.values} />
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

{#if showInstructions}
	<Instructions bind:showInstructions />
{/if}
