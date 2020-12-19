import { writable, get } from "svelte/store";

export function local(key, initial) {
  const toString = (value) => JSON.stringify(value, null, 2); // helper function
  const toObj = JSON.parse; // helper function

  if (localStorage) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, toString(initial));
    }

    const saved = toObj(localStorage.getItem(key) || '');

    const store = writable(saved);

    return {
      subscribe: store.subscribe,
      set: (value) => {
        localStorage.setItem(key, toString(value));

        store.set(value);
      },
      update: (fn) => {
        store.update(fn);

        localStorage.setItem(key, toString(get(store)));
      }
    };
  } else {
    return writable(initial);
  }
}
