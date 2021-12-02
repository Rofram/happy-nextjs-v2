import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MapProvider } from '../contexts/mapContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MapProvider>
      <Head>
        <title>Happy :)</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </MapProvider>
  );
}

export default MyApp;
