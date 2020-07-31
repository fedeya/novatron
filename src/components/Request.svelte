<script lang="ts">
  import axios from 'axios';
  import TextField from 'smelte/src/components/TextField';
  import List from 'smelte/src/components/List';
  import Button from 'smelte/src/components/Button';
  import { Select } from 'smelte';
  import { data, status, loading } from '../store/response';
  import { bodyRaw } from '../store/request';
  import JsonEditor from './JsonEditor.svelte';

  let url: string = 'http://jsonplaceholder.typicode.com/users';
  let method: string = 'get';
  let raw: string = '';

  const methods = [
    { value: 'get', text: 'GET' },
    { value: 'post', text: 'POST' },
    { value: 'put', text: 'PUT' },
    { value: 'delete', text: 'DELETE' },
    { value: 'patch', text: 'PATCH' }
  ];

  async function handleSubmit() {
    loading.set(true);
    try {
      const res = await axios[method](url, $bodyRaw);
      data.set(res.data);
      status.set(res.status);
    } catch (err) {
      data.set(JSON.stringify(err.response.data, null, '  '));
      status.set(err.response.status);
    }
    loading.set(false);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <TextField label="Url" bind:value={url} />
  <Select items={methods} bind:value={method} label="Method" />
  <JsonEditor />
  <Button>Send</Button>
</form>
