import { writable } from 'svelte/store';

export const data = writable<object | string>({});
export const status = writable(0);
export const loading = writable(false);
