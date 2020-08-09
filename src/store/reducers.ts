import * as types from './types';
import { Post } from '../../interfaces';

interface BlogState {
  posts: Post[];
}

const initialBlogState: BlogState = {
  posts: []
};

const timerReducer = (state = initialBlogState, { type, payload }) => {
  switch (type) {
    case types.ADD_POST:
      return {
        posts: [payload, ...state.posts]
      };
    case types.REMOVE_POST:
      return {
        posts: payload
      };
    default:
      return state;
  }
};

export default timerReducer;
