<script>
  import { fade } from "svelte/transition";

  export let name;
  export let multi;

  multi.update((v) => {
    v[name] = false;

    return v;
  });

  let visible = false;

  multi.subscribe((v) => (visible = v[name]));
</script>

<style>
  .step-container {
    display: flex;
    flex-direction: column;
    min-height: 480px;
  }
</style>

{#if visible}
  <div class="step-container" in:fade={{ duration: 300 }}>
    <slot />
  </div>
{/if}
