<script lang="ts">
  import { Highlight } from 'svelte-highlight';
  import { json } from 'svelte-highlight/languages';
  import { data, status } from '../store/response';
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
  <Highlight language={json} code={$data} />
</div>
