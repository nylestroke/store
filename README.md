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
import { Store } from '@nylestroke/store';

const store = new Store();

const firstCallback = state => {
  console.log('first callback ', state); // callback function
};
const firstConfig = state => { // there you can state, as you want
  return state;
};

const secondCallback = state => {
  console.log('second callback ', state);
};
const secondConfig = state => {
  return [state];
};

store.subscribe(firstCallback, firstConfig); // call subscription with callback and configuration
store.subscribe(secondCallback, secondConfig);

store.setState({ a: 1 }); // add value to state (not set)
store.clearState(); // clear the state
store.setState({ a: 2 });
store.setState({ b: 1 });
store.cutState('b'); // delete key from a state
store.setState({ b: 2 });
```

## License

[MIT](https://github.com/nylestroke/store/blob/master/LICENSE)
