import { Store } from '../dist/esm/index.js';

const store = new Store();

const firstCallback = state => {
  console.log('first callback ', state);
};
const firstConfig = state => {
  return state;
};

const secondCallback = state => {
  console.log('second callback ', state);
};
const secondConfig = state => {
  return [state];
};

store.subscribe(firstCallback, firstConfig);
store.subscribe(secondCallback, secondConfig);

store.setState({ a: 1 });
store.clearState();
store.setState({ a: 2 });
store.setState({ b: 1 });
store.cutState('b');
store.setState({ b: 2 });
