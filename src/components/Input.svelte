<script>
  import { createEventDispatcher } from "svelte";

  export let store;
  export let element;
  const {name, placeholder} = element;

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

<style type="text/scss">
  $color-shadow: #babecc;

  input {
    border: 1px solid #ccc;
    outline: 0;
    font-size: 16px;
    border-radius: 3px;
    text-shadow: 1px 1px 0 white;
    box-shadow: inset 1px 1px 2px $color-shadow, inset -1px -1px 2px white;
    padding: 20px 25px;
    width: 400px;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    appearance: none;
    -webkit-appearance: none;

    &:focus {
      box-shadow: inset 2px 2px 5px $color-shadow, inset -5px -5px 10px white;
    }
  }

  label:not(:last-of-type) {
    margin-bottom: 10px;
  }
</style>

<label>
  <input type="text" bind:value on:input={onInput} {name} {placeholder} />
</label>
