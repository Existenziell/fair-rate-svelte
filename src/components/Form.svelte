<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { local } from "../localStore";
  import { validationSchema } from "../validationSchema";
  import Button from "./Button.svelte";
  import Loading from "./Loading.svelte";
  import Success from "./Success.svelte";

  export let name;
  export let showInstructions;

  const dispatch = createEventDispatcher();
  const store = name !== undefined ? local(name, {}) : writable({});
  const multi = writable({});

  let multi_loc = {};
  let current = 0;

  let has_errors = false;
  let errors = [];

  export let submitting;
  export let saved;

  multi.subscribe((v) => (multi_loc = v));

  const storeInDB = async (form) => {
    try {
      const res = await fetch(`${process.env.API_URL}/forms/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form: form }),
      });
      const content = await res.json();
      return content;
    } catch (err) {
      // console.log(err);
    }
  };

  const onSubmit = (e) => {
    submitting = true;
    validationSchema
      .validate($store)
      .then(async (value) => {
        const res = await storeInDB(value);
        if (res) {
          has_errors = false;
          submitting = false;
          saved = true;
        }
      })
      .catch((err) => {
        has_errors = true;
        errors = err;
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
        // console.log(
        //   current,
        //   Object.keys(multi_loc)[current],
        //   $store[Object.keys(multi_loc)[current]]
        // );

        // If value not set, don't navigate to next step
        if (!$store[Object.keys(multi_loc)[current]]) {
          has_errors = true;
          errors = "This is a required field.";
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
    margin-top: 20px;
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
  .error-wrapper {
    height: 80px;
    margin-top: 20px;
    background-color: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;

    .error {
      color: crimson;
    }
  }
</style>

<form on:submit={onSubmit}>
  {#if submitting}
    <Loading />
  {:else if saved}
    <Success />
  {:else}
    <slot {store} {multi} />
    <div class="error-wrapper">
      {#if has_errors}
        <div class="error">{errors}</div>
      {/if}
    </div>
  {/if}

  <div class="controls">
    {#if !showInstructions && !saved && !submitting}
      {#if Object.keys(multi_loc)[current - 1]}
        <a href="/" on:click|preventDefault={prev} class="prev">
          <i class="fas fa-chevron-left" />
        </a>
      {/if}
    {/if}
    {#if Object.keys(multi_loc)[current + 1]}
      <Button handler={next} value="Next" />
    {/if}

    {#if !Object.keys(multi_loc)[current + 1]}
      {#if !submitting && !saved}
        <Button handler={onSubmit} value="Submit Form" />
      {/if}
    {/if}
  </div>
</form>
