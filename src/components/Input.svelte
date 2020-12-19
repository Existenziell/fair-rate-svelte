<script>
  import { createEventDispatcher } from "svelte";

  export let store;
  export let name;

  const dispatch = createEventDispatcher();

  let value;

  store.subscribe((v) => (value = v[name]));

  const onInput = (e) => {
    store.update((v) => {
      v[name] = value;
      return v;
    });
    dispatch("input", e);
  };
</script>

<style>
</style>

<label>
  <input type="text" bind:value on:input={onInput} {name} {...$$restProps} />
</label>
