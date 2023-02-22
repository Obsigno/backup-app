import { writable } from "svelte/store";
import { browser } from '$app/environment';

const defaultValue = [];
const initialValue = browser ? JSON.parse(window.localStorage.getItem('ContainerFileItemsStore')) ?? defaultValue : defaultValue;

const ContainerFileItemsStore = writable<string>(initialValue);
  
ContainerFileItemsStore.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('ContainerFileItemsStore', JSON.stringify(value));
  }
});

export default ContainerFileItemsStore;