<script lang="ts">
  import Request from './components/Request.svelte';
  import Response from './components/Response.svelte';
  import Appbar from './components/Appbar.svelte';
</script>

<style>
  .container {
    margin-top: 42px;
  }
</style>

<Appbar />
<div class="container mx-auto">
  <Request />
  <Response />
</div>
