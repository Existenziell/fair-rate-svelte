<script>
  // Props
  export let form;
  export let name;

  // Get the form field
  $: field = form.field(name);
  // Value svelte store
  $: value = field.value;
  // State svelte store, {valid: boolean, error: string}
  $: state = field.state;
</script>

<style type="text/scss">
  .input {
    .validation {
      display: none;
    }
    &.error {
      .validation {
        display: block;
        color: crimson;
      }
    }
  }
</style>

<div class="input" class:error={$state.valid === false}>
  <input type="text" bind:value={$value} />
  <p class="validation">{$state.error}</p>
</div>
