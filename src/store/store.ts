import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

let store;

function initStore(initialState) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export const initializeStore = (preloadedState) => {
  let state = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    state = initStore({
      ...preloadedState,
      ...store.getState()
    });
    store = undefined;
  }

  if (typeof window === 'undefined') {
    return state;
  }
  if (!store) store = state;

  return state;
};

export function useStore(initialState) {
  const state = useMemo(() => initializeStore(initialState), [initialState]);
  return state;
}
