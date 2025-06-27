# vue-course

> Pinia State Management

This branch contains the implementation using Pinia for state management.

## Key Features

- **Modular Stores:** Define and use modular stores for better structure.
- **Reactivity:** Utilize Vue 3's reactive system for state management.
- **Devtools Integration:** Integrated with Vue Devtools for easier debugging.
- **TypeScript Support:** Built-in support for TypeScript.

## Example

### Store Setup

First, set up the Pinia store:

```javascript
// store.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    message: 'Hello, Pinia!'
  }),
  getters: {
    upperCaseMessage(state) {
      return state.message.toUpperCase();
    }
  },
  actions: {
    updateMessage(newMessage) {
      this.message = newMessage;
    }
  }
});
```
### Vue Component
Next, use the Pinia store in a Vue component:

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from './store';

export default defineComponent({
  setup() {
    const mainStore = useMainStore();
    const changeMessage = () => {
      mainStore.updateMessage('Hello, updated Pinia message!');
    };
    return {
      message: mainStore.message,
      changeMessage
    };
  }
});
</script>


```

## Project Setup

```sh
npm install
```

## Install Pinia
```sh
 npm install pinia
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


