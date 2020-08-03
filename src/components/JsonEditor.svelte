<script lang="ts">
  import { onMount } from 'svelte';
  import CodeFlask from 'codeflask';
  import { bodyRaw } from '../store/request';

  let el: HTMLElement;
  let editor;
  let isValid = true;
  onMount(() => {
    editor = new CodeFlask(el, { language: 'js', lineNumbers: true });
    editor.onUpdate(code => {
      const val = editor.getCode().trim();
      try {
        bodyRaw.set(JSON.parse(val));
        isValid = true;
      } catch (error) {
        bodyRaw.set({});
        isValid = val.length === 0;
      }
    });
  });
</script>

<style>
  .codeflask-container {
    height: 250px;
  }
  label {
    font-size: 0.7rem;
  }
  .error {
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>

<div class="my-2 relative">
  <label class="ml-4 block">Body Raw JSON</label>
  <div class="codeflask-container relative" bind:this={el} />
  {#if !isValid}
    <div class="error">Invalid Format</div>
  {/if}
</div>
