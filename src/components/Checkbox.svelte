<script>
  export let checkbox;
</script>

<style type="text/scss">
  .checkbox {
    margin-right: 20px;
  }
</style>

<div class="checkbox">
  <label class="checkbox">
    <input
      type="checkbox"
      checked={checkbox.checked}
      on:click={() => (checkbox.checked = !checkbox.checked)} />
    {checkbox.value}</label>
</div>
