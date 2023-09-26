## @nylestroke/store

@nylestroke/store is a simple state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

## Installation

```
npm install @nylestroke/store
```

For more details, see [the NPM page](https://npmjs.com/package/@nylestroke/store).

## Basic Example

```js
import { Store } from '../dist/esm/index.js';

const store = new Store(); // create store

const firstCallback = state => { // create first callback
  console.log('first callback ', state);
};
const firstConfig = state => { // configuration for callback
  return { a: state.a };
};

const secondCallback = state => { // create second callback
  console.log('second callback ', state);
};
const secondConfig = state => { // configuration for callback
  return { b: state.b };
};

store.subscribe(firstCallback, firstConfig); // subscribe to changes from callback
store.subscribe(secondCallback, secondConfig);

store.setState({ a: 1 }); // set a new state
store.setState({ a: 2 });
store.setState({ b: 1 });
store.setState({ b: 2 });
```

## License

[MIT](https://github.com/nylestroke/store/blob/master/LICENSE)
