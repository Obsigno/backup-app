<script lang="ts">
  import {
    Button,
    Search,
    Modal
  } from 'flowbite-svelte';
  import { Funnel } from 'svelte-heros-v2';
  import LoginModal from '$lib/componenets/login-modal.svelte';
  import FilesTable from '$lib/componenets/backup-table.svelte';
  import FileItemsStore from '$lib/store/files';

  let loginModal = false;
  let fileItems: any[] = [];
  let searchTerm = '';

  $: filteredFiles = fileItems.filter((item: any) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

  FileItemsStore.subscribe((data: any) => {
    // TODO listen to data where priority owner 
    fileItems = data;
  });
</script>

<h1 class="text-2xl">Previously Stored</h1>
<div class="flex justify-between pt-8">
  <div class="flex">
    <Button size="md" outline={true} disabled={fileItems.length === 0} on:click={() => (loginModal = true)}
      >Delete Permenently
    </Button>
  </div>
  <div class="flex space-x-4">
    <Button size="md" outline={true}><Funnel variation="solid" color="grey" /></Button>
    <Search bind:value={searchTerm} class="dark:bg-transparent w-56" />
  </div>
</div>
<FilesTable fileItems={filteredFiles} />
{#if !fileItems.length}
  <div class="flex items-center justify-center ">No data to show</div>
{/if}
<Modal bind:open={loginModal} size="xs" autoclose={false} class="w-full">
  <LoginModal />
</Modal>
