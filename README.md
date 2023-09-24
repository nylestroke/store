## @nylestroke/store

@nylestroke/store is a simple state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

## Installation

```
npm install nylestroke-store
```

For more details, see [the NPM page](https://npmjs.com/packages/nylestroke-store).

## Basic Example

```js
import { createStore } from 'nylestroke-store';

const store = createStore({
    email: '',
    username: '',
    password: ''
});

// Set new value
store.set('email', () => 'admin@nylestroke.me');

// Get value
const email = store.get('email'); // { "email": admin@nylestroke.me, ... }

// Empty value
store.empty('value'); // { "email": null }

// Delete value
store.delete('email'); // { "username": "", "password": "" } (email completely removed from object)

// Get store state object
const state = store.object(); // { "username": "", "password": "" }

```

## License

[MIT](LICENSE)