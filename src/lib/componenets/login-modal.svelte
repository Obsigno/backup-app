<script lang="ts">
  import { Button, Input, Label } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function onSubmit(e) {
    const formData = new FormData(e.target);
    const isValid =
      formData.get('email') === 'user@gmail.com' && formData.get('password') === 'password';

    dispatch('submit', { isValid });
  }
</script>

<form class="flex flex-col space-y-6" action="#" on:submit|preventDefault={onSubmit}>
  <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Log in</h3>
  <h5 class="text-lg font-light text-gray-900 dark:text-white p-0">
    Enter your login credentials to continue
  </h5>
  <Label class="space-y-2">
    <Input type="email" name="email" placeholder="Username" required />
  </Label>
  <Label class="space-y-2">
    <Input type="password" name="password" placeholder="Password" required />
  </Label>
  <Button type="submit" class="w-full1">Log in</Button>
  <div class="text-sm font-medium text-gray-500 dark:text-gray-300">Forgot your password?</div>
</form>
