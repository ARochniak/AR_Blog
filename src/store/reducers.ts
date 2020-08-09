import { ADD_POST, REMOVE_POST } from './types';
import { RootState, Post } from '../../interfaces';

const initialBlogState: RootState = {
  posts: []
};

interface AddAction {
  type: typeof ADD_POST;
  payload: Post;
}

interface RemovePost {
  type: typeof REMOVE_POST;
  payload: Post[];
}

export type KonwnActions = AddAction | RemovePost;

const blogReducer = (state = initialBlogState, { type, payload }: KonwnActions): RootState => {
  switch (type) {
    case ADD_POST:
      return {
        posts: [payload as Post, ...state.posts]
      };
    case REMOVE_POST:
      return {
        posts: payload as Post[]
      };
    default:
      return state;
  }
};

export default blogReducer;
