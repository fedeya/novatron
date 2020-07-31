<script lang="ts">
  import JSONFormatter from 'json-formatter-js';

  export let code: object;
  let el: HTMLElement;

  $: {
    if (el) {
      if (code) {
        const formatter = new JSONFormatter(code, 2, {
          hoverPreviewEnabled: true,
          hoverPreviewArrayCount: 100,
          hoverPreviewFieldCount: 5,
          theme: '',
          animateOpen: true,
          animateClose: true,
          useToJSON: true
        });
        el.appendChild(formatter.render());
      } else {
        el.innerHTML = '';
      }
    }
  }
</script>

<style>

</style>

<div bind:this={el} />
