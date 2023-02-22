import { writable } from "svelte/store";
import { browser } from '$app/environment';

const defaultValue = [];
const initialValue = browser ? JSON.parse(window.localStorage.getItem('FileItemsStore')) ?? defaultValue : defaultValue;

const FileItemsStore = writable<string>(initialValue);
  
FileItemsStore.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('FileItemsStore', JSON.stringify(value));
  }
});

export default FileItemsStore;