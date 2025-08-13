import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Text } from '../src/shared/components';
import theme from '../src/theme';

// Import stories manually for now
import * as ButtonStories from '../src/shared/components/Button.stories';

export default function Storybook() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <ScrollView style={{ flex: 1 }}>
          <Box padding={16}>
            <Text variant="title1" marginBottom={24}>
              Storybook - Button Component
            </Text>

            <Box marginBottom={32}>
              <Text variant="title2" marginBottom={16}>
                Default
              </Text>
              <ButtonStories.Default />
            </Box>

            <Box marginBottom={32}>
              <Text variant="title2" marginBottom={16}>
                All Variants
              </Text>
              <ButtonStories.AllVariants />
            </Box>

            <Box marginBottom={32}>
              <Text variant="title2" marginBottom={16}>
                Loading States
              </Text>
              <ButtonStories.LoadingStates />
            </Box>

            <Box marginBottom={32}>
              <Text variant="title2" marginBottom={16}>
                Disabled States
              </Text>
              <ButtonStories.DisabledStates />
            </Box>

            <Box marginBottom={32}>
              <Text variant="title2" marginBottom={16}>
                Custom Styling
              </Text>
              <ButtonStories.CustomStyling />
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
