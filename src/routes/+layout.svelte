<script lang="ts">
  import '../app.postcss';
  import { page } from '$app/stores';
  import {
    Navbar,
    NavBrand,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    Drawer,
    Dropdown,
    Avatar,
    DropdownHeader,
    NavHamburger,
    DropdownItem,
    DropdownDivider,
    Modal,
    Card,
    DarkMode
  } from 'flowbite-svelte';
  import {
    DocumentArrowDown,
    DocumentArrowUp,
    DocumentDuplicate,
    LockClosed
  } from 'svelte-heros-v2';
  import { sineIn } from 'svelte/easing';
  // import { DonutChart, LineChart } from '@carbon/charts-svelte';
  // import '@carbon/styles/css/styles.css';
  // import '@carbon/charts/styles.css';

  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };
  let width: number;
  let backdrop: boolean = false;
  let activateClickOutside = false;
  let drawerHidden: boolean = false;
  $: activeUrl = $page.url.pathname;
  let spanClass = 'flex-1 ml-6 whitespace-nowrap w-64';
  let aClass="flex items-center p-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
  let activeClass="flex items-center p-4 text-base font-normal text-gray-900 bg-gray-200 dark:bg-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
  // let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
  let adminModal = false;
</script>

<svelte:window bind:innerWidth={width} />

<Navbar navDivClass="flex flex-wrap justify-between items-center">
  <NavBrand href="/store">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Obsingo
    </span>
  </NavBrand>
  <div class="flex items-center gap-8 md:order-2">
    <DarkMode />
    <LockClosed on:click={() => (adminModal = true)} />
    <Avatar
      id="avatar-menu"
      src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
    />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm"> Bonnie Green </span>
      <span class="block truncate text-sm font-medium"> bonnie@obsingo.com </span>
    </DropdownHeader>
    <DropdownItem>Contact</DropdownItem>
    <DropdownItem>Account</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
</Navbar>
<Drawer
  leftOffset="top-15 h-screen left-0"
  transitionType="fly"
  {backdrop}
  {transitionParams}
  bind:hidden={drawerHidden}
  bind:activateClickOutside
  width="w-72"
  class="overflow-scroll border-solid border-r border-gray-700"
  id="sidebar"
>
  <Sidebar>
    <SidebarWrapper divClass="overflow-y-auto py-3 px-1 rounded dark:bg-gray-800">
      <p class="mb-4 text-gray-700">MENU</p>
      <SidebarGroup>
        <SidebarItem label="Store" href="/store" {spanClass} {aClass} {activeClass} active={activeUrl === '/store'}>
          <svelte:fragment slot="icon">
            <DocumentArrowDown />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Restore" href="/restore" {spanClass} {aClass} {activeClass} active={activeUrl === '/restore'}>
          <svelte:fragment slot="icon">
            <DocumentArrowUp />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="My Backup" href="/backup" {spanClass} {aClass} {activeClass} active={activeUrl === '/backup'}>
          <svelte:fragment slot="icon">
            <DocumentDuplicate />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
<Modal title="Admin Console" bind:open={adminModal} autoclose>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    Available Space: 2,0000GB (30%)
  </p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400"># of Peers</p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">% Peers Available</p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    # Class Type (Pie Distribution of Priority: Server/Desktop/Laptop...)
  </p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    # Dormant Peers (>2 Months)
  </p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    Snapshot for Deletion > More (Tablet/List)
  </p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Pareto (80/20)</p>
  <div class="flex flex-row">
    <div class="basic-1/2">
      <Card>
        <!-- <DonutChart -->
          data={[
            {
              group: '2V2N 9KYPM version 1',
              value: 20000
            },
            {
              group: 'L22I P66EP L22I P66EP L22I P66EP',
              value: 65000
            },
            {
              group: 'JQAI 2M4L1',
              value: 75000
            },
            {
              group: 'J9DZ F37AP',
              value: 1200
            },
            {
              group: 'YEL48 Q6XK YEL48',
              value: 10000
            },
            {
              group: 'Misc',
              value: 25000
            }
          ]}
          options={{
            toolbar: {
              enabled: false
            },
            resizable: true,
            legend: {
              alignment: 'center'
            },
            donut: {
              center: {
                label: 'Browsers'
              },
              alignment: 'center'
            },
            height: '400px'
          }}
        <!-- /> -->
      </Card>
    </div>
    <div class="basic-1/2">
      <Card>
        <!-- <LineChart
          data={[
            {
              group: 'Dataset 1',
              date: '2018-12-31T22:00:00.000Z',
              value: 50000,
              surplus: 505695164.8422486
            },
            {
              group: 'Dataset 1',
              date: '2019-01-04T22:00:00.000Z',
              value: 65000,
              surplus: 65326049.94481772
            },
            {
              group: 'Dataset 1',
              date: '2019-01-07T22:00:00.000Z',
              value: null,
              surplus: 8124.051230466711
            },
            {
              group: 'Dataset 1',
              date: '2019-01-12T22:00:00.000Z',
              value: 49213,
              surplus: 1128522941.5871649
            },
            {
              group: 'Dataset 1',
              date: '2019-01-16T22:00:00.000Z',
              value: 51213,
              surplus: 671704968.5839127
            },
            {
              group: 'Dataset 2',
              date: '2019-01-01T22:00:00.000Z',
              value: 0,
              surplus: 9919.96239224473
            },
            {
              group: 'Dataset 2',
              date: '2019-01-05T22:00:00.000Z',
              value: 57312,
              surplus: 52444214.31671249
            },
            {
              group: 'Dataset 2',
              date: '2019-01-07T22:00:00.000Z',
              value: 27432,
              surplus: 498398198.88062936
            },
            {
              group: 'Dataset 2',
              date: '2019-01-14T22:00:00.000Z',
              value: 70323,
              surplus: 46671896.36803694
            },
            {
              group: 'Dataset 2',
              date: '2019-01-18T22:00:00.000Z',
              value: 21300,
              surplus: 511513624.45115155
            },
            {
              group: 'Dataset 3',
              date: '2018-12-31T22:00:00.000Z',
              value: 40000,
              surplus: 667153161.9069163
            },
            {
              group: 'Dataset 3',
              date: '2019-01-04T22:00:00.000Z',
              value: null,
              surplus: 10759.461497162443
            },
            {
              group: 'Dataset 3',
              date: '2019-01-07T22:00:00.000Z',
              value: 18000,
              surplus: 287458691.8140402
            },
            {
              group: 'Dataset 3',
              date: '2019-01-12T22:00:00.000Z',
              value: 39213,
              surplus: 706517267.8956708
            },
            {
              group: 'Dataset 3',
              date: '2019-01-16T22:00:00.000Z',
              value: 61213,
              surplus: 170759163.41875598
            },
            {
              group: 'Dataset 4',
              date: '2019-01-01T22:00:00.000Z',
              value: 20000,
              surplus: 38842065.03829535
            },
            {
              group: 'Dataset 4',
              date: '2019-01-05T22:00:00.000Z',
              value: 37312,
              surplus: 387372991.09438866
            },
            {
              group: 'Dataset 4',
              date: '2019-01-07T22:00:00.000Z',
              value: 51432,
              surplus: 357188027.05829567
            },
            {
              group: 'Dataset 4',
              date: '2019-01-14T22:00:00.000Z',
              value: 25332,
              surplus: 520433101.4650072
            },
            {
              group: 'Dataset 4',
              date: '2019-01-18T22:00:00.000Z',
              value: null,
              surplus: 4835.494293277565
            }
          ]}
          options={{
            toolbar: {
              enabled: false
            },
            axes: {
              bottom: {
                title: '2019 Annual Sales Figures',
                mapsTo: 'date',
                scaleType: 'time'
              },
              left: {
                mapsTo: 'value',
                title: 'Conversion rate',
                scaleType: 'linear'
              }
            },
            curve: 'curveMonotoneX',
            height: '400px'
          }} -->
        />
      </Card>
    </div>
  </div>
</Modal>
<div class="flex m-16" >
  <main class="ml-72 w-full mx-auto">
    <slot />
  </main>
</div>
