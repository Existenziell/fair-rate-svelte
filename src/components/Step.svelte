<script>
  export let name;
  export let multi;

  multi.update((v) => {
    v[name] = false;

    return v;
  });

  let visible = false;

  multi.subscribe((v) => (visible = v[name]));
</script>

{#if visible}
  <div>
    <slot />
  </div>
{/if}
