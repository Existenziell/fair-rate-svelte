<script>
  import { createEventDispatcher } from "svelte";

  export let store;
  export let name;
  export let values;
  const dispatch = createEventDispatcher();
  console.log(values);
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

<label>
  <select bind:value on:blur={onChange} {name} {...$$restProps}>
    <option>-- Please Choose --</option>
    {#each values as value}
      <option {value}>{value}</option>
    {/each}
  </select>
</label>
