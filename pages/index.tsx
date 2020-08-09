// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';
// import { startClock } from '../src/store/actions';
import styled from 'styled-components';
import { Post } from '../interfaces';

export async function getServerSideProps() {
  const res = await axios('https://simple-blog-api.crew.red/posts');
  const posts: Post[] = res.data;

  return {
    props: {
      posts
    }
  };
}

const Grid = styled.div`
  display: grid;
  grid-gap: 32px 32px;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  width: 100%;
`;

const PostDiv = styled.div`
  position: relative;

  padding-bottom: 75%;

  background-image: url(/blogpost.webp);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Index = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Link href="/create">
        <a>Add post</a>
      </Link>
      <Grid>
        {posts
          .map((post) => (
            <PostDiv key={post.id}>
              <div>{post.title}</div>
              <Link href="post/[id]" as={`post/${post.id}`}>
                <a>Open post</a>
              </Link>
            </PostDiv>
          ))
          .reverse()}
      </Grid>
    </>
  );
};

export default Index;
