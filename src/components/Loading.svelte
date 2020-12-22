<script>
  import { Circle2 } from "svelte-loading-spinners";
</script>

<style>
  .header {
    background-color: #efefef;
    padding: 20px;
  }
  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
</style>

<div class="header">
  <h1>Submitting Data</h1>
</div>
<div class="spinner">
  <Circle2 size="100" color="#FF3E00" unit="px" />
</div>
