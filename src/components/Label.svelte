<script>
  export let text;
</script>

<style type="text/scss">
  .container {
    text-align: justify;
    width: 75%;
    margin: 20px auto;
    line-height: 22px;
  }
</style>

<section class="container">
  {@html text}
</section>
