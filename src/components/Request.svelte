<script lang="ts">
  import axios, { AxiosResponse, AxiosError } from 'axios';
  import TextField from 'smelte/src/components/TextField';
  import List from 'smelte/src/components/List';
  import Button from 'smelte/src/components/Button';
  import Checkbox from 'smelte/src/components/Checkbox';
  import { Select } from 'smelte';
  import { data, status, loading } from '../store/response';
  import { bodyRaw, headersRequest } from '../store/request';
  import JsonEditor from './JsonEditor.svelte';
  import RequestHeaders from './RequestHeaders.svelte';
  import { stringify } from 'query-string';

  type Method = 'get' | 'delete' | 'post' | 'put' | 'patch';

  let url: string = 'http://localhost:4000';
  let method: Method = 'get';
  let raw: string = '';
  let isUrlEncoded = false;

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
        const body = isUrlEncoded ? stringify($bodyRaw) : $bodyRaw;
        const headers = isUrlEncoded
          ? {
              ...$headersRequest,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          : $headersRequest;
        res = await axios[method](url, body, {
          headers
        });
      }
      data.set(res.data);
      status.set(res.status);
    } catch (err) {
      if (err.response) {
        data.set(err.response.data);
        status.set(err.response.status);
      } else {
        data.set(err.message);
      }
    }
    loading.set(false);
  }
</script>

<div>
  <TextField label="Url" bind:value={url} />
  <Select items={methods} bind:value={method} label="Method" />
  <JsonEditor />
  <Checkbox label="Url encoded" bind:checked={isUrlEncoded} />
  <RequestHeaders />
  <Button on:click={SendRequest}>Send</Button>
</div>
