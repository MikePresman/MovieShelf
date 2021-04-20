import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css';
import Navigator from '../Components/Nav/Navigator';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navigator/>
    <Component {...pageProps} />
  </>
  );
}

export default MyApp
