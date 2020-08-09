import axios from 'axios';
import * as types from './types';
import { Post } from '../../interfaces';

export const addPost = (post: Post, callBack: () => void) => async (dispatch, getState) => {
  const body = JSON.stringify(post);
  const response = await axios.post('https://simple-blog-api.crew.red/posts', body, {
    headers: { 'Content-Type': 'application/json' }
  });
  const { posts } = getState();
  if (!posts) return;
  dispatch({ type: types.ADD_POST, payload: response.data });
  callBack();
};

export const removePost = (id: number, callBack: () => void) => async (dispatch, getState) => {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
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