import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { addPost } from '../../src/store/actions';
import Layout from '../../src/components/Layout';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.textarea`
  padding: 5px 10px;
  font-wieght: ${(props: { isTitle: boolean }) => (props.isTitle ? 'bold' : 'normal')};
  font-size: ${(props: { isTitle: boolean }) => (props.isTitle ? '1.5em' : '1em')};
  margin-bottom: 20px;
`;

const CreateButtonWrapper = styled.div`
  text-align: center;
`;

const CreateButton = styled.input`
  margin: 0 auto;
  padding: 10px 50px;
  background-color: black;
  color: white;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

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
    <Layout page="create">
      <Form onSubmit={addPostHandler}>
        <Field isTitle onChange={titleChangeHandler} placeholder="Enter post title" rows="1" />
        <Field onChange={bodyChangeHandler} placeholder="Enter post body" rows="10" />
        <CreateButtonWrapper>
          <CreateButton type="submit" value="Add post" />
        </CreateButtonWrapper>
      </Form>
    </Layout>
  );
}
