<script lang="ts">
  import {
    Button,
    Checkbox,
    Chevron,
    Dropdown,
    DropdownItem,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';
  import { Trash } from 'svelte-heros-v2';

  export let fileItems: any[];
  export let checkAllRows: boolean = false;

  const priorityTypes = ['Owner', 'Other'];
  const accessLevelTypes = ['Managment', 'Finance', 'Marketing', 'Sales', 'Legal', 'HR', 'R&D', 'IT', 'Operations' ];

  function checkAllFiles() {
    fileItems = fileItems.map((item) => {
      item.checked = !checkAllRows;
      return item;
    });
  }

  function removeFile(selectedItem: any) {
    fileItems = fileItems.filter((i) => i.name !== selectedItem.name);
  }
</script>

<Table class="mt-8">
  <TableHead>
    <TableHeadCell>
      <Checkbox on:click={checkAllFiles} bind:checked={checkAllRows} />
    </TableHeadCell>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Size</TableHeadCell>
    <TableHeadCell>Date</TableHeadCell>
    <TableHeadCell>Folder</TableHeadCell>
    <TableHeadCell>Type</TableHeadCell>
    <TableHeadCell>Access Level</TableHeadCell>
    <TableHeadCell>Priority</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each fileItems as item}
      <TableBodyRow>
        <TableBodyCell>
          <Checkbox checked={item.checked} />
        </TableBodyCell>
        <TableBodyCell>{item.name}</TableBodyCell>
        <TableBodyCell>{item.size}</TableBodyCell>
        <TableBodyCell>{item.date}</TableBodyCell>
        <TableBodyCell>{item.folder}</TableBodyCell>
        <TableBodyCell>{item.type}</TableBodyCell>
        <TableBodyCell>
          <Button size="md" outline={true}><Chevron>{item.accessLevel}</Chevron></Button>
          <Dropdown class="w-44 p-3 space-y-3 text-sm">
            {#each accessLevelTypes as type}
              <DropdownItem
                on:click={() => (item.accessLevel = type)}
                bind:value={item.accessLevel}
                >{type}
              </DropdownItem>
            {/each}
          </Dropdown>
        </TableBodyCell>
        <TableBodyCell>
          <Button size="md" outline={true}><Chevron>{item.priority}</Chevron></Button>
          <Dropdown class="w-44 p-3 space-y-3 text-sm">
            {#each priorityTypes as type}
              <DropdownItem
                on:click={() => (item.priority = type)}
                bind:value={item.priority}
                >{type}
              </DropdownItem>
            {/each}
          </Dropdown>
        </TableBodyCell>
        <TableBodyCell>
          <Trash on:click={() => removeFile(item)} />
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>