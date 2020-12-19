<script>
  import { createEventDispatcher } from "svelte";

  export let store;
  export let name;
  export let placeholder;

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
  $color-bg: #ebecf0;
  $color-shadow: #babecc;
  $color-white: #fff;

  input[type="text"] {
    border: 1px solid #ccc;
    outline: 0;
    font-size: 16px;
    border-radius: 3px;
    background-color: $color-bg;
    text-shadow: 1px 1px 0 $color-white;
    box-shadow: inset 1px 1px 2px $color-shadow,
      inset -1px -1px 2px $color-white;
    padding: 20px 25px;
    width: 400px;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    appearance: none;
    -webkit-appearance: none;

    &:focus {
      box-shadow: inset 2px 2px 5px $color-shadow,
        inset -5px -5px 10px $color-white;
    }
  }
</style>

<label>
  <input type="text" bind:value on:input={onInput} {name} {placeholder} />
</label>
