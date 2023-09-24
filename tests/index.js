import { createStore } from '../dist/esm/index.js';

// Create store
const store = createStore({
    email: '',
    username: '',
    password: ''
});
console.debug('Initial store state: ', JSON.stringify(store.object()));

// Changing data
store.set('email', () => 'admin@google.com');
store.set('password', () => 'Admin1111');
store.set('username', () => 'Google Admin');
console.debug('Store state after changing data: ', JSON.stringify(store.object()));

// Clear a store
store.clear();
console.debug('Store state after clearing: ', JSON.stringify(store.object()));

// Add new data
store.set('email', () => 'support@microsoft.com');
store.set('password', () => 'Microsoft1111');
store.set('username', () => 'Microsoft Support');
console.debug('Store state after adding new data: ', JSON.stringify(store.object()));

// Delete some data
store.delete('username');
console.debug('Store state after deleting data: ', JSON.stringify(store.object()));

// Empty some data
store.empty('email');
console.debug('Store state after empty data: ', JSON.stringify(store.object()));