import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UiProvider } from '../context';

import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline>
                  <Component {...pageProps} />
                </CssBaseline>
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>

  )
}

export default MyApp
