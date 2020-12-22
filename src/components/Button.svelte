<script>
  export let value;
  export let handler;
  export let width = "";
</script>

<style type="text/scss">
  $color-bg: #ebecf0;
  $color-shadow: #babecc;

  button {
    border: 0;
    outline: 0;
    font-size: 16px;
    border-radius: 3px;
    background-color: #aa418c;
    color: white;
    font-weight: bold;
    box-shadow: -5px -5px 20px white, 5px 5px 20px $color-shadow;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-weight: 600;
    padding: 10px 30px;

    &:hover {
      box-shadow: -2px -2px 5px white, 2px 2px 5px $color-shadow;
    }

    &:active {
      box-shadow: inset 1px 1px 2px $color-shadow, inset -1px -1px 2px white;
    }
  }
</style>

<button on:click|preventDefault={handler} style="width={width}">{value}</button>
