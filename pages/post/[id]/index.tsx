import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { removePost } from '../../../src/store/actions';

export async function getServerSideProps({ query }) {
  const res = await axios(`https://simple-blog-api.crew.red/posts/${query.id}`);
  const post: Post = res.data;

  return {
    props: {
      post
    }
  };
}

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <h3>{post.title}</h3>
      <button
        type="button"
        onClick={() => {
          dispatch(removePost(post.id, () => router.push('/')));
        }}
      >
        Remove this post
      </button>
      <Link href="/">
        <a>Back to posts</a>
      </Link>
    </>
  );
};

export default Post;
