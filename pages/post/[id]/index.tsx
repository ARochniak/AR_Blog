import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { removePost } from '../../../src/store/actions';
import Layout from '../../../src/components/Layout';

export async function getServerSideProps({ query }) {
  const res = await axios(`https://simple-blog-api.crew.red/posts/${query.id}`);
  const post: Post = res.data;

  return {
    props: {
      post
    }
  };
}

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const RemoveButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h3`
  text-align: center;
`;

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Layout>
      <PostWrapper>
        <RemoveButton
          type="button"
          onClick={() => {
            dispatch(removePost(post.id, () => router.push('/')));
          }}
        >
          Remove this post
        </RemoveButton>
        <Title>{post.title}</Title>
        <p>{post.body}</p>
      </PostWrapper>
    </Layout>
  );
};

export default Post;
