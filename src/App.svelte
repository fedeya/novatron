<script lang="ts">
  import { github } from 'svelte-highlight/styles';
  import Request from './components/Request.svelte';
  import Response from './components/Response.svelte';
</script>

<svelte:head>
  {@html github}
</svelte:head>

<div class="container mx-auto">
  <Request />
  <Response />
</div>
