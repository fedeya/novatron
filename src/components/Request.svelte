<script lang="ts">
  import axios, { AxiosResponse } from 'axios';
  import TextField from 'smelte/src/components/TextField';
  import List from 'smelte/src/components/List';
  import Button from 'smelte/src/components/Button';
  import { Select } from 'smelte';
  import { data, status, loading } from '../store/response';
  import { bodyRaw, headersRequest } from '../store/request';
  import JsonEditor from './JsonEditor.svelte';
  import RequestHeaders from './RequestHeaders.svelte';

  type Method = 'get' | 'delete' | 'post' | 'put' | 'patch';

  let url: string = 'http://localhost:4000';
  let method: Method = 'get';
  let raw: string = '';

  const methods = [
    { value: 'get', text: 'GET' },
    { value: 'post', text: 'POST' },
    { value: 'put', text: 'PUT' },
    { value: 'delete', text: 'DELETE' },
    { value: 'patch', text: 'PATCH' }
  ];

  async function SendRequest() {
    loading.set(true);
    try {
      let res: AxiosResponse;
      if (method === 'get' || method === 'delete') {
        res = await axios[method](url, {
          headers: $headersRequest
        });
      } else {
        res = await axios[method](url, $bodyRaw, {
          headers: $headersRequest
        });
      }
      data.set(res.data);
      status.set(res.status);
    } catch (err) {
      console.log(err);
      data.set(err.response.data);
      status.set(err.response.status);
    }
    loading.set(false);
  }
</script>

<div>
  <TextField label="Url" bind:value={url} />
  <Select items={methods} bind:value={method} label="Method" />
  <JsonEditor />
  <RequestHeaders />
  <Button on:click={SendRequest}>Send</Button>
</div>
