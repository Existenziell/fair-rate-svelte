<script>
  import Button from "./Button.svelte";
</script>

<style>
  h2 {
    font-size: 66px;
    margin-bottom: 20px;
  }
  .header {
    background-color: #efefef;
    padding: 20px;
    margin-bottom: 40px;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 360px;
  }
  .mt30 {
    margin-top: 30px;
  }
</style>

<div class="success">
  <div class="header">
    <h1>Success</h1>
  </div>

  <div class="container">
    <h2>FairRate</h2>
    <p>Thank you for using our service.</p>
    <div class="mt30">
      <Button
        handler={() => (window.location.href = 'http://www.fair-rate.com')}
        value="Visit Website"
        width="200" />
    </div>
  </div>
</div>
