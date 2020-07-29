<script lang="ts">
  import axios from 'axios';
  import TextField from 'smelte/src/components/TextField';
  import List from 'smelte/src/components/List';
  import Button from 'smelte/src/components/Button';
  import { Select } from 'smelte';
  import { data, status } from '../store/response';

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
    try {
      let body;

      try {
        body = JSON.parse(raw);
      } catch {
        body = null;
      }

      const res = await axios[method](url, body);
      data.set(JSON.stringify(res.data, null, '  '));
      status.set(res.status);
    } catch (err) {
      data.set(JSON.stringify(err.response.data, null, '  '));
      status.set(err.response.status);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <TextField label="Url" bind:value={url} />
  <Select items={methods} bind:value={method} label="Method">
    <div slot="options">
      <List bind:value={method} select={true} items={methods} />
    </div>
  </Select>
  <TextField textarea bind:value={raw} />
  <Button>Send</Button>
</form>
