<script lang="ts">
  import { headersRequest } from '../store/request';
  import TextField from 'smelte/src/components/TextField';
  import Button from 'smelte/src/components/Button';

  interface IHeaders {
    id: number;
    header: string;
    value: string;
  }

  let headers: IHeaders[] = [];

  $: {
    let addedHeaders = {};

    headers.forEach(({ header, value }, index) => {
      if (value === '') return;
      addedHeaders[header] = value;
    });

    headersRequest.set({ ...addedHeaders });
  }

  function addHeader() {
    headers = [...headers, { id: Date.now(), header: '', value: '' }];
  }

  function deleteHeader(id: number) {
    headers = headers.filter(header => header.id !== id);
  }
</script>

<div>
  {#if headers.length > 0}
    <p>Headers</p>
  {/if}
  {#each headers as { header, value, id } (id)}
    <div class="flex mx-auto w-full justify-center items-center">
      <div class="w-full mx-2">
        <TextField label="Header" bind:value={header} />
      </div>
      <div class="w-full mx-2">
        <TextField label="Value" bind:value />
      </div>
      <div class="mx-2">
        <Button color="error" on:click={() => deleteHeader(id)}>Delete</Button>
      </div>
    </div>
  {/each}
  <div class="mb-3">
    <Button on:click={addHeader}>Add Header +</Button>
  </div>
</div>
