<script lang="ts">
  import {
    Button,
    Search,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    Dropzone,
    Modal,
    Chevron,
    DropdownItem,
    Dropdown,
    Datepicker
  } from 'flowbite-svelte';
  import { Funnel } from 'svelte-heros-v2';
  import LoginModal from '$lib/componenets/login-modal.svelte';
  import FilesTable from '$lib/componenets/store-table.svelte';
  import FileItemsStore from '$lib/store/files';
  import ContainerFileItemsStore from '$lib/store/container-files';

  let containerFiles: any[] = [];
  const scheduledOptions = ['Once', 'Daily', 'Weekly', 'Monthly', 'Custom'];
  let scheduledSelectedOption = 'Scheduled';
  const date = new Date().toISOString();
  let newFileModal = false;
  let previouslyStoredModal = false;
  let loginModal = false;
  let previouslyStoredItems: any[] = [];
  let files: FileList;
  let checkAllRows = false;
  let scheduleDropdownOpen = false;
  let searchTerm = '';
  let allFilesChecked: boolean = false;

  // let promise = FileItemsStore.init();

  // Inner
  async function startSharding(e) {
    const isValid = e.detail.isValid;

    if (!isValid) {
      console.warn('User credential is not valid');
    }

    await storeNewFiles();

    // init page
    loginModal = false;
    checkAllRows = false;
    updateCheckedFalse();
  }

  async function storeNewFiles() {
    const newStoredFiles = await createFile();

    FileItemsStore.update((currentData) => {
      return [...newStoredFiles, ...(currentData as any)];
    });
  }

  function updateCheckedFalse() {
    containerFiles = containerFiles.map((item) => {
      item.checked = false;
      return item;
    });
    ContainerFileItemsStore.subscribe(() => containerFiles);
  }

  async function createFile() {
    let newFiles = [];

    let filteredCehkedConrainerFiles = containerFiles
      .filter(({ checked }) => checked)
      .filter(({ name }) => name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    for await (const containerFile of filteredCehkedConrainerFiles) {
      let file: File = containerFile.file;

      if (!file) {
        console.log('Failed to find matched file of: ', containerFile.name);
      } else {
        var formdata = new FormData();
        formdata.append('file', file, file.name);

        let requestOptions: RequestInit = {
          method: 'POST',
          body: formdata
        };

        let res = await fetch('http://localhost:8080/files', requestOptions);
        let data = await res.json();

        requestOptions = {
          method: 'PATCH',
          body: JSON.stringify({
            id: data.id,
            priority: containerFile.priority.toUpperCase(),
            accessLevel: containerFile.accessLevel.toUpperCase()
          }),
          headers: {
            "content-type": "application/json"
          }
        };

        res = await fetch('http://localhost:8080/files', requestOptions);

        if (res.ok) {
          containerFiles = [];
          ContainerFileItemsStore.update(() => containerFiles);
          containerFile.id = data.id;
          newFiles.push(containerFile);
        } else {
          throw new Error(data);
        }
      }
    }

    return newFiles;
  }

  // Update Modal drop to container list
  function handleFilesSelect() {
    let [file] = files;

    if (containerFiles.find(({ name }) => file.name === name)) {
      console.log('File existsts in container');
    } else {
      // add to containerFiles list
      const newConrainerFile = {
        name: file.name,
        size: file.size,
        date: new Date().toISOString(),
        folder: file.webkitRelativePath,
        type: file.type,
        priority: 'High', // Default
        accessLevel: 'R&D', // Default
        checked: false,
        file
      };

      containerFiles = [newConrainerFile, ...containerFiles];

      ContainerFileItemsStore.update(() => containerFiles);
    }

    newFileModal = false;
  }

  // Previously added
  FileItemsStore.subscribe((data: any) => {
    previouslyStoredItems = data;
  });

  ContainerFileItemsStore.subscribe((data: any) => {
    containerFiles = data;
  });

  function addToContainer() {
    containerFiles = [
      ...containerFiles,
      ...previouslyStoredItems
        .filter((item) => item.checked)
        .filter((item) => !containerFiles.find((existItem) => existItem.name === item.name))
        .map((item) => {
          return {
            ...item,
            ...{ checked: false }
          };
        })
    ];

    ContainerFileItemsStore.update(() => containerFiles);
  }

  // Model priviosle stored
  function checkAllFiles() {
    previouslyStoredItems = previouslyStoredItems.map((item) => {
      item.checked = !allFilesChecked;
      return item;
    });
  }

  function updateChecked(updatedItem: any) {
    previouslyStoredItems = previouslyStoredItems.map((i) => {
      if (updatedItem.name == i.name) {
        i.checked = !updatedItem.checked;
      }

      return i;
    });
  }

  $: filteredItems = containerFiles.filter(
    (item: any) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );
  

  // store table dispatch
  function removeFileUpdate(e) {
    const name = e.detail.name;
    containerFiles = containerFiles.filter(
      (item: any) => item.name !== name
    );
    ContainerFileItemsStore.update(() => containerFiles);
  }
</script>

<h1 class="text-2xl ">Storing list</h1>
<div class="flex justify-between pt-8">
  <div class="flex space-x-4">
    <Button class="" size="md" outline={true} on:click={() => (newFileModal = true)}
      >New Items</Button
    >
    <Button
      class=""
      size="md"
      outline={true}
      on:click={() => {
        previouslyStoredModal = true;
        allFilesChecked = false;
        previouslyStoredItems = previouslyStoredItems.map((i) => {
          i.checked = false;

          return i;
        });
      }}>Previously Stored</Button
    >
  </div>
  <div class="flex space-x-4">
    <Button color="light"><Funnel variation="solid" color="grey" /></Button>
    <Search bind:value={searchTerm} class="dark:bg-transparent w-56" />
  </div>
</div>
<FilesTable fileItems={filteredItems} {checkAllRows} on:removeFileUpdate={(e) => removeFileUpdate(e)}/>
{#if !containerFiles.length}
  <div class="flex items-center justify-center ">No data to show</div>
{/if}
<div class="flex flex-row-reverse gap-x-2">
  <Button size="md" outline={true} class="order-last"
    ><Chevron>{scheduledSelectedOption}</Chevron></Button
  >
  <Dropdown bind:open={scheduleDropdownOpen} class="w-44 p-3 space-y-3 text-sm">
    {#each scheduledOptions as option}
      <DropdownItem
        on:click={() => {
          scheduledSelectedOption = option;
          scheduleDropdownOpen = false;
        }}
        bind:value={scheduledSelectedOption}>{option}</DropdownItem
      >
    {/each}
  </Dropdown>
  {#if scheduledSelectedOption === 'Custom'}
    <Datepicker range />
  {/if}
  <Button
    size="md"
    outline={true}
    disabled={scheduledSelectedOption === 'Scheduled'}
    on:click={() => (loginModal = true)}>Start</Button
  >
</div>
<Modal title="New Items To Close" bind:open={newFileModal} autoclose>
  <Dropzone id="dropzone" on:change={handleFilesSelect} bind:files>
    <svg
      aria-hidden="true"
      class="mb-3 w-10 h-10 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      /></svg
    >
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-semibold">Click to upload</span> or drag and drop
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
  </Dropzone>
</Modal>
<Modal title="Previously Stored" on:wheel bind:open={previouslyStoredModal} autoclose>
  <Table>
    <TableHead>
      <TableHeadCell>
        <Checkbox on:click={checkAllFiles} bind:checked={allFilesChecked} />
      </TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Size</TableHeadCell>
      <TableHeadCell>Date</TableHeadCell>
      <TableHeadCell>Folder</TableHeadCell>
      <TableHeadCell>Type</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each previouslyStoredItems as item}
        <TableBodyRow>
          <TableBodyCell>
            <Checkbox
              checked={item.checked}
              on:click={() => {
                updateChecked(item);
              }}
            />
          </TableBodyCell>
          <TableBodyCell>{item.name}</TableBodyCell>
          <TableBodyCell>{item.size}</TableBodyCell>
          <TableBodyCell>{item.date}</TableBodyCell>
          <TableBodyCell>{item.folder}</TableBodyCell>
          <TableBodyCell>{item.type}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  <svelte:fragment slot="footer">
    <Button on:click={addToContainer}>Add to Container</Button>
  </svelte:fragment>
</Modal>
<Modal bind:open={loginModal} size="xs" autoclose={false} class="w-full">
  <LoginModal on:submit={startSharding} />
</Modal>
