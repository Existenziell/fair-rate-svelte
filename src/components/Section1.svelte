<script>
  import { formData } from "../stores";
  import Checkbox from "./Checkbox.svelte";
  import TextInput from "./TextInput.svelte";
  // export let form;

  const checkboxes = $formData.section1.checkboxes;
  let agencyCaseNumber = $formData.section1.agencyCaseNumber.value;
  console.log(agencyCaseNumber);
</script>

<style>
  .border {
    border-right: 1px solid #333;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
  }
</style>

<section>
  <h2>I. TYPE OF MORTGAGE AND TERMS OF LOAN</h2>

  <div class="border">
    <label for="">Mortgage Applied for:</label>
    <div class="is-flex">
      {#each checkboxes as checkbox}
        <Checkbox bind:checkbox />
      {/each}
    </div>
    {console.log(agencyCaseNumber)}
    <TextInput bind:agencyCaseNumber />
  </div>
</section>
