import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addPost } from '../../src/store/actions';

export default function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const router = useRouter();
  const titleChangeHandler = (e: React.ChangeEvent<HTMLTextareaElement>) => {
    setTitle(e.currentTarget.value);
  };
  const bodyChangeHandler = (e: React.ChangeEvent<HTMLTextareaElement>) => {
    setBody(e.currentTarget.value);
  };
  const addPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !body) return;
    const post = { title, body };
    dispatch(addPost(post, () => router.push('/')));
  };
  return (
    <form onSubmit={addPostHandler}>
      <textarea onChange={titleChangeHandler} placeholder="Enter post title" cols="30" rows="10" />
      <textarea onChange={bodyChangeHandler} placeholder="Enter post body" cols="30" rows="10" />
      <input type="submit" value="Add post" />
    </form>
  );
}
