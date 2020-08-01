<script lang="ts">
  import Request from './components/Request.svelte';
  import Response from './components/Response.svelte';
  import Appbar from './components/Appbar.svelte';
</script>

<style>
  .main-comtainer {
    padding: 2rem;
    height: calc(100vh - 2.6rem);
    overflow-y: auto;
  }
</style>

<Appbar />
<div class="main-comtainer">
  <div class="container mx-auto">
    <Request />
    <Response />
  </div>
</div>
