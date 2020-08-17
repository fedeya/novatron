<script>
  import { onMount } from 'svelte';
  const remote = require('electron').remote;
  const currentWindow = remote.getCurrentWindow();

  let maximized = currentWindow && currentWindow.isMaximized();

  function onChangeState() {
    maximized = currentWindow && currentWindow.isMaximized();
  }

  onMount(() => {
    if (currentWindow) {
      currentWindow.removeAllListeners();
      currentWindow.addListener('maximize', onChangeState);
      currentWindow.addListener('unmaximize', onChangeState);
      currentWindow.addListener('restore', onChangeState);
      currentWindow.addListener('close', () => {
        currentWindow && currentWindow.removeAllListeners();
      });
    }
    return () => {
      currentWindow && currentWindow.removeAllListeners();
    };
  });
  function close() {
    currentWindow && currentWindow.close();
  }
  function minimize() {
    currentWindow && currentWindow.minimize();
  }
  function restore() {
    currentWindow && currentWindow.restore();
  }
  function maximize() {
    currentWindow && currentWindow.maximize();
  }
</script>

<style>
  .appbar {
    height: 2.6rem;
    width: 100vw;
  }
  .iconTitle {
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  .btnAction {
    cursor: default;
    height: 100%;
    width: 2.6rem;
    display: inline-flex;
  }
</style>

<div class="appbar flex bg-primary-500 text-white">
  <div class="iconTitle flex flex-1 items-center pl-4">NoVaTRoN</div>
  <div class="flex-initial">
    <span
      class="btnAction material-icons hover:bg-primary-800 justify-center
      items-center"
      on:click={minimize}
    >
      minimize
    </span>
    {#if maximized}
      <span
        class="btnAction material-icons hover:bg-primary-800 justify-center
        items-center"
        on:click={restore}
      >
        content_copy
      </span>
    {:else}
      <span
        class="btnAction material-icons hover:bg-primary-800 justify-center
        items-center"
        on:click={maximize}
      >
        crop_square
      </span>
    {/if}
    <span
      class="btnAction material-icons hover:bg-error-800 justify-center
      items-center"
      on:click={close}
    >
      close
    </span>
  </div>
</div>
