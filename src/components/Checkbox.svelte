<script>
  import { formData } from "../stores";
  export let name;
</script>

<style type="text/scss">
</style>

<div class="checkbox">
  <label class="checkbox">
    <input
      type="checkbox"
      on:click={() => ($formData[name] = !$formData[name])} />
    {name}</label>
</div>
