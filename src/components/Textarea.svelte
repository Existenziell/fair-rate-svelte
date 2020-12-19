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
  textarea {
    width: 400px;
    height: 200px;
    padding: 18px 22px;
    resize: vertical;
    outline: 1px solid #eee;
    border: none;
  }

  textarea:focus {
    outline: 1px solid #ccc;
  }
</style>

<label>
  <textarea bind:value on:input={onInput} {name} {...$$restProps} />
</label>
