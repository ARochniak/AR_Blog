import { Provider } from 'react-redux';
import { useStore } from '../src/store/store';
import '../public/style.css';

export default function App({ Component, pageProps }) {
  const store = useStore({ posts: pageProps.posts });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
