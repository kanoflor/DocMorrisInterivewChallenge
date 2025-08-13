import React from 'react';
import { Box } from './Box';
import { Button } from './Button';

export const Default = () => (
  <Button onPress={() => console.log('Default button pressed')}>
    Default Button
  </Button>
);

export const AllVariants = () => (
  <Box gap={16}>
    <Button variant="primary" onPress={() => console.log('Primary pressed')}>
      Primary Button
    </Button>
    <Button
      variant="secondary"
      onPress={() => console.log('Secondary pressed')}
    >
      Secondary Button
    </Button>
    <Button variant="applePay" onPress={() => console.log('Apple Pay pressed')}>
      🍎 Apple Pay
    </Button>
    <Button variant="link" onPress={() => console.log('Link pressed')}>
      Link Button
    </Button>
    <Button variant="icon" onPress={() => console.log('Icon pressed')}>
      +
    </Button>
  </Box>
);

export const LoadingStates = () => (
  <Box gap={16}>
    <Button
      variant="primary"
      loading
      onPress={() => console.log('Loading pressed')}
    >
      Loading Primary
    </Button>
    <Button
      variant="secondary"
      loading
      onPress={() => console.log('Loading pressed')}
    >
      Loading Secondary
    </Button>
  </Box>
);

export const DisabledStates = () => (
  <Box gap={16}>
    <Button
      variant="primary"
      disabled
      onPress={() => console.log('Disabled pressed')}
    >
      Disabled Primary
    </Button>
    <Button
      variant="secondary"
      disabled
      onPress={() => console.log('Disabled pressed')}
    >
      Disabled Secondary
    </Button>
  </Box>
);

export const CustomStyling = () => (
  <Box gap={16}>
    <Button
      variant="primary"
      boxProps={{ borderRadius: 'xl', paddingVertical: 20 }}
      onPress={() => console.log('Custom style pressed')}
    >
      Custom Border Radius
    </Button>
    <Button
      variant="secondary"
      textColor="danger"
      onPress={() => console.log('Custom text color pressed')}
    >
      Custom Text Color
    </Button>
  </Box>
);
