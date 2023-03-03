import { createStore } from 'redux'
import { RootReducer } from './reducer';

export const store = createStore(
  RootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);