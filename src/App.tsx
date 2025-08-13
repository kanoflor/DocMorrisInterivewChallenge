import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import AppNavigator from './screens/navigation';
import { store } from './store';
import theme from './theme';

// Uncomment the line below to enable Storybook
import Storybook from '../.storybook/Storybook';

const SHOW_STORYBOOK = true; // Set to true to show Storybook

export default function App() {
  if (SHOW_STORYBOOK) {
    return <Storybook />;
  }

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
