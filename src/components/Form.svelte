<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { local } from "../localStore";
  import { validationSchema } from "../validationSchema";
  import Button from "./Button.svelte";
  import Success from "./Success.svelte";

  export let name;
  export let showInstructions;

  const dispatch = createEventDispatcher();
  const store = name !== undefined ? local(name, {}) : writable({});
  const multi = writable({});

  let multi_loc = {};
  let current = 0;
  let is_success = false;
  let has_errors = false;
  let errors = [];
  let saved = false;

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
    validationSchema
      .validate($store)
      .then(async (value) => {
        const res = await storeInDB(value);
        if (res) {
          is_success = true;
          has_errors = false;
          saved = true;
        }
      })
      .catch((err) => {
        has_errors = true;
        is_success = false;
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
  .error-container {
    height: 80px;
    margin-top: 20px;
    background-color: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;

    .error {
      color: crimson;
    }
    .success {
      color: darkcyan;
    }
  }
</style>

<form on:submit={onSubmit}>
  {#if saved}
    <Success />
  {:else}
    <slot {store} {multi} />
  {/if}
  <div class="error-container">
    {#if has_errors}
      <div class="error">{errors}</div>
    {/if}
    {#if is_success}
      <div class="success">
        Thank you, your data has been saved successfully.
      </div>
    {/if}
  </div>

  <div class="controls">
    {#if !showInstructions}
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
      {#if saved}
        <Button
          handler={() => (window.location.href = 'http://www.fair-rate.com')}
          value="More Information" />
      {:else}
        <Button handler={onSubmit} value="Submit" />
      {/if}
    {/if}
  </div>
</form>
