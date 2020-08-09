import axios from 'axios';
import * as types from './types';
import { AppThunkAction } from '../../interfaces';
import { KonwnActions } from './reducers';

export const addPost = (post: { body: string; title: string }, callBack: () => void): AppThunkAction<KonwnActions> => async (dispatch, getState) => {
  const body = JSON.stringify(post);
  const response = await axios.post('https://simple-blog-api.crew.red/posts', body, {
    headers: { 'Content-Type': 'application/json' }
  });
  const { posts } = getState();
  if (!posts) return;
  dispatch({ type: types.ADD_POST, payload: response.data });
  callBack();
};

export const removePost = (id: number, callBack: () => void): AppThunkAction<KonwnActions> => async (dispatch, getState) => {
  const requestOptions = {
    method: 'DELETE'
  };
  try {
    await fetch(`https://simple-blog-api.crew.red/posts/${id}`, requestOptions);
  } catch (err) {
    console.log(err.message);
  }
  const { posts } = getState();
  if (!posts) return;
  const newPosts = posts.filter((post) => post.id !== id);
  dispatch({ type: types.REMOVE_POST, payload: newPosts });
  callBack();
};
