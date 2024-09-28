import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { App } from './components/App.tsx';
import { store } from './store';
import { Provider } from 'react-redux'

const customTheme = extendTheme({
  colors: {
    gray: {
      200: '#cccccc',
      300: '#cccccc',
      800: "#000000",
    },
    pink: {
      500: "#FF006B"
    }
  },
  fonts: {
    body: '"Montserrat", sans-serif',
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={customTheme} resetCSS>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
)
