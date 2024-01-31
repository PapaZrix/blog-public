import { SessionProvider } from 'next-auth/react';
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import NavbarContextProvider from '../context/NavbarContext';
import '@uploadthing/react/styles.css';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <SessionProvider session={pageProps.session}>
        <NavbarContextProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Toaster position='top-center' />
            </Hydrate>
          </QueryClientProvider>
        </NavbarContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
