import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { UserGeolocationProvider } from '../contexts/mapContext';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Happy :)</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <ToastContainer />
      <UserGeolocationProvider>
        <Component {...pageProps} />
      </UserGeolocationProvider>
    </>
  );
}

export default MyApp;
