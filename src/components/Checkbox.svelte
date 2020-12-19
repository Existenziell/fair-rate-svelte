<script>
  import { createEventDispatcher } from "svelte";

  export let store;
  export let name;
  export let value;

  const dispatch = createEventDispatcher();

  const onInput = (e) => {
    store.update((v) => {
      v[name] = value;
      return v;
    });
    dispatch("input", e);
  };
</script>

<style type="text/scss">
  input {
    margin-right: 5px;
    display: inline-block;
    margin-bottom: 30px;
  }
  label {
    background-color: rgb(247, 247, 247);
    padding: 10px 20px;
    margin-bottom: 4px;
    border-radius: 2px;
  }
  input,
  label {
    &:hover {
      cursor: pointer;
    }
  }
</style>

<label>
  <input
    type="checkbox"
    checked={value === $store[name]}
    {name}
    on:input={onInput}
    bind:value />
  {value}
</label>
