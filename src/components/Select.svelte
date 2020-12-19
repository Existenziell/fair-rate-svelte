<script>
  import { createEventDispatcher } from "svelte";

  export let store;
  export let name;
  export let values;
  const dispatch = createEventDispatcher();
  let value;

  store.subscribe((v) => (value = v[name]));

  const onChange = (e) => {
    store.update((v) => {
      v[name] = value;
      return v;
    });

    dispatch("change", e);
  };
</script>

<style>
  select {
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 0.25em;
    padding: 14px 20px;
    cursor: pointer;
    font-size: 18px;
  }
</style>

<label>
  <select bind:value on:blur={onChange} {name}>
    <option>-- Please Choose --</option>
    {#each values as value}
      <option {value}>{value}</option>
    {/each}
  </select>
</label>
