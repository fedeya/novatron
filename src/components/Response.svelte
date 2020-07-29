<script lang="ts">
  import ProgressCircular from 'smelte/src/components/ProgressCircular';
  import { data, status, loading } from '../store/response';
  import JsonViewer from './JsonViewer.svelte';
</script>

<style>
  .highlight {
    max-height: 25rem;
    overflow: auto;
    font-size: 12px;
  }
</style>

<div class="status">{$status || ''}</div>
<div class="highlight">
  {#if $loading}
    <ProgressCircular />
  {:else}
    <JsonViewer code={$data} />
  {/if}
</div>
