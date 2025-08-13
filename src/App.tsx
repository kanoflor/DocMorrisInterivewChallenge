import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import AppNavigator from './screens/navigation';
import { store } from './store';
import theme from './theme';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
