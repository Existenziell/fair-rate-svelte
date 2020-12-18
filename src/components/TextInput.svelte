<script>
  import { afterUpdate, beforeUpdate, onMount } from "svelte";

  // Props
  // export let form;
  // export let name;
  export let agencyCaseNumber;
  // export let value;

  console.log(agencyCaseNumber);
  // let value = data.value;
  // let label = data.label;
  afterUpdate(async () => {
    // Get the form current data
    // const data = form.data();
    // console.log(data);
    // console.log(`valid: ${$form.valid}`);
  });

  // Get the form field
  // $: field = form.field(name);
  // Value svelte store
  // $: value = field.value;
  // State svelte store, {valid: boolean, error: string}
  // $: state = field.state;
</script>

<style type="text/scss">
  // .input {
  //   .validation {
  //     display: none;
  //   }
  //   &.error {
  //     .validation {
  //       display: block;
  //       color: crimson;
  //     }
  //   }
  // }
</style>

<div class="input"><input type="text" placeholder={'label'} /></div>

<!-- <div class="input" class:error={$state.valid === false}>
  <input type="text" bind:value placeholder={value} />
  <p class="validation">{$state.error}</p>
</div> -->
