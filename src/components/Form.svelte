<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";

  import { local } from "../localStore";

  export let name;

  const dispatch = createEventDispatcher();

  const store = name !== undefined ? local(name, {}) : writable({});
  const multi = writable({});

  let multi_loc = {};
  let current = 0;

  multi.subscribe((v) => (multi_loc = v));

  const onSubmit = (e) => dispatch("submit", { e, store });

  function prev() {
    if (Object.keys(multi_loc)[current - 1]) {
      multi.update((v) => {
        v[Object.keys(multi_loc)[current]] = false;

        return v;
      });

      current -= 1;

      multi.update((v) => {
        v[Object.keys(multi_loc)[current]] = true;

        return v;
      });
    }
  }

  function next() {
    if (Object.keys(multi_loc)[current + 1]) {
      multi.update((v) => {
        v[Object.keys(multi_loc)[current]] = false;

        return v;
      });

      current += 1;

      multi.update((v) => {
        v[Object.keys(multi_loc)[current]] = true;

        return v;
      });
    }
  }

  onMount(() => {
    multi.update((v) => {
      v[Object.keys(multi_loc)[current]] = true;

      return v;
    });
  });
</script>

<style type="text/scss">
  form {
    position: relative;
  }
  .controls {
    margin-top: 40px;
  }
  .prev {
    position: absolute;
    top: 15px;
    left: 25px;
    color: #cececf;
    font-size: 42px;
    &:hover {
      color: #666;
    }
  }
</style>

<form on:submit={onSubmit} {...$$restProps}>
  <slot {store} {multi} />

  <div class="controls">
    {#if Object.keys(multi_loc)[current - 1]}
      <a href="/" on:click|preventDefault={prev} class="prev">
        <i class="fas fa-chevron-left" />
      </a>
    {/if}

    {#if Object.keys(multi_loc)[current + 1]}
      <button on:click|preventDefault={next}>Next</button>
    {/if}

    {#if !Object.keys(multi_loc)[current + 1]}
      <input type="submit" placeholder="Submit" />
    {/if}
  </div>
</form>
