<script lang="ts">
  import { onMount } from 'svelte';
  import CodeFlask from 'codeflask';
  import { bodyRaw } from '../store/request';

  let el: HTMLElement;
  let editor;
  onMount(() => {
    editor = new CodeFlask(el, { language: 'js', lineNumbers: true });
    editor.onUpdate(code => {
      try {
        bodyRaw.set(JSON.parse(editor.getCode()));
      } catch (error) {
        bodyRaw.set({});
      }
    });
  });
</script>

<style>
  .codeflask-container {
    position: relative;
    height: 250px;
  }
  label {
    font-size: 0.7rem;
  }
</style>

<div class="my-2">
  <label class="ml-4 block">Body Raw JSON</label>
  <div class="codeflask-container" bind:this={el} />
</div>
