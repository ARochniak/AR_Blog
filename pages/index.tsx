// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';
// import { startClock } from '../src/store/actions';
import styled from 'styled-components';
import { Post } from '../interfaces';
import Layout from '../src/components/Layout';

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

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
`;

const Title = styled.h3`
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const PostDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const OpenPostLink = styled.a`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: black;
  color: white;
  padding: 10px 0;
  &:hover {
    cursor: pointer;
  }
`;

const Index = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout page="home">
      <Grid>
        {posts
          .map((post) => (
            <PostDiv key={post.id}>
              <Image src="/blogpost.webp" alt="blog-post" />
              <PostDescription>
                <Title>{post.title}</Title>
                <Link href="post/[id]" as={`post/${post.id}`}>
                  <OpenPostLink>Continue reading</OpenPostLink>
                </Link>
              </PostDescription>
            </PostDiv>
          ))
          .reverse()}
      </Grid>
    </Layout>
  );
};

export default Index;
