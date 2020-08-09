import { useMemo } from 'react';
import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers, { KonwnActions } from './reducers';
import { RootState } from '../../interfaces';

let store:
  | (Store<RootState, KonwnActions> & {
      dispatch: unknown;
    })
  | undefined;

function initStore(initialState: RootState) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export const initializeStore = (preloadedState: RootState) => {
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

export function useStore(initialState: RootState) {
  const state = useMemo(() => initializeStore(initialState), [initialState]);
  return state;
}
