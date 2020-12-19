<script>
  import Button from "./Button.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { local } from "../localStore";
  import { validationSchema } from "../validationSchema";

  export let name;

  const dispatch = createEventDispatcher();
  const store = name !== undefined ? local(name, {}) : writable({});
  const multi = writable({});

  let multi_loc = {};
  let current = 0;
  let is_success = false;
  let has_errors = false;
  let errors = [];

  multi.subscribe((v) => (multi_loc = v));

  const onSubmit = (e) => {
    validationSchema
      .validate($store)
      .then((value) => {
        is_success = true;
        has_errors = false;
        // console.log("valid! ", value);
      })
      .catch((err) => {
        has_errors = true;
        is_success = false;
        errors = err;
        // console.log(err);
      });

    dispatch("submit", { e, store });
  };

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
      if (Object.keys(multi_loc)[current] !== "intro") {
        // If value not set, don't navigate to next step
        if (
          $store[Object.keys(multi_loc)[current]] === undefined ||
          $store[Object.keys(multi_loc)[current]] === ""
        ) {
          has_errors = true;
          errors = "This is a required value.";
          return false;
        } else {
          has_errors = false;
          errors = "";
        }
      }

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
    color: #aa418c;
    font-size: 42px;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
  .error {
    margin-top: 20px;
    color: crimson;
    background-color: #efefef;
    padding: 20px;
  }
  .success {
    margin-top: 20px;
    color: darkcyan;
  }
</style>

<form on:submit={onSubmit}>
  <slot {store} {multi} />

  {#if has_errors}
    <div class="error">{errors}</div>
  {/if}

  {#if is_success}
    <div class="success">Thank you, your data has been saved successfully</div>
  {/if}

  <div class="controls">
    {#if Object.keys(multi_loc)[current - 1]}
      <a href="/" on:click|preventDefault={prev} class="prev">
        <i class="fas fa-chevron-left" />
      </a>
    {/if}

    {#if Object.keys(multi_loc)[current + 1]}
      <Button handler={next} value="Next" />
    {/if}

    {#if !Object.keys(multi_loc)[current + 1]}
      <Button handler={onSubmit} value="Submit" />
    {/if}
  </div>
</form>
