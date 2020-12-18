<script>
  // Props
  export let form;
  export let name;
  // console.log(name);
  // Get the form field
  $: field = form.field(name);
  // Checked svelte store
  // $: checked = field.checked;
</script>

<style type="text/scss">
</style>

<div class="checkbox">
  <label class="checkbox"> <input type="checkbox" /> {name}</label>
</div>
