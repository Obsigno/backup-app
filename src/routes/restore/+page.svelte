<script lang="ts">
  import {
    Button,
    Search,
    Modal
  } from 'flowbite-svelte';
  import { Funnel } from 'svelte-heros-v2';
  import LoginModal from '$lib/componenets/login-modal.svelte';
  import FilesTable from '$lib/componenets/store-table.svelte';
  import FileItemsStore from '$lib/store/files';

  let loginModal = false;

  let fileItems: any[];
  FileItemsStore.subscribe((data: any) => {
    updateCheckedFalse(data);
    fileItems = data;
  });

  function updateCheckedFalse(data) {
    data.forEach((item) => {
      item.checked = false;
    });
  }


  async function handleStartRestore() {
    if (import.meta.env.MODE === 'demo') return;
    
    for await (const file of fileItems) {
      const res = await self.fetch(`http://localhost:8080${file.downloadUri}`);

      if (res.ok) {
        console.log(`File ${file.name} restored successfully`);
      }
    }
  }
</script>

<h1 class="text-2xl">Restore to Local Drive</h1>
<div class="flex justify-end pt-8 space-x-4">
  <Button size="md" outline={true}><Funnel variation="solid" color="grey" /></Button>
  <div>
    <Search class="dark:bg-transparent w-56" />
  </div>
</div>
<FilesTable {fileItems} />
{#if !fileItems.length}
  <div class="flex items-center justify-center ">No data to show</div>
{/if}
<div class="flex justify-end">
  <Button size="md" outline={true} disabled={fileItems.length === 0} on:click={handleStartRestore}>Start</Button>
</div>
<Modal bind:open={loginModal} size="xs" autoclose={false} class="w-full" >
    <LoginModal />
</Modal>