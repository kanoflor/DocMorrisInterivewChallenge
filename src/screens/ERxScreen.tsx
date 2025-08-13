import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Box, Button, Text, TextInput } from '../shared/components';
import { addItem } from '../store/slices/cart';
import { setToken } from '../store/slices/erx';
import theme from '../theme';
import { RootStackParamList } from './navigation';

const mockDecodeFromImage = async (): Promise<string> => {
  await new Promise(r => setTimeout(r, 500));
  return 'RX-TOKEN-1234-MOCK';
};

const mockFetchPrescription = async (token: string) => {
  await new Promise(r => setTimeout(r, 400));
  return {
    id: 'rx-ibuprofen-400',
    name: 'Ibuprofen 400mg (Rx)',
    qty: 1,
    price: 4.99,
    token,
  };
};

export default function ERxScreen() {
  const [manual, setManual] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFromImage = async () => {
    try {
      setLoading(true);
      const token = await mockDecodeFromImage();
      dispatch(setToken(token));
      const rx = await mockFetchPrescription(token);
      dispatch(
        addItem({ id: rx.id, name: rx.name, qty: rx.qty, price: rx.price }),
      );
      Alert.alert('Added to cart', `Token: ${token}`);
      nav.navigate('Cart');
    } finally {
      setLoading(false);
    }
  };

  const handleFromManual = async () => {
    if (!manual.trim()) return;
    try {
      setLoading(true);
      const token = manual.trim();
      dispatch(setToken(token));
      const rx = await mockFetchPrescription(token);
      dispatch(
        addItem({ id: rx.id, name: rx.name, qty: rx.qty, price: rx.price }),
      );
      Alert.alert('Added to cart', `Token: ${token}`);
      nav.navigate('Cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Box flex={1} padding={16}>
        <Text variant="body2" marginBottom={16}>
          Use a test image or paste a token. (Camera/NFC are mocked on
          simulator.)
        </Text>

        <Button
          variant="primary"
          onPress={loading ? undefined : handleFromImage}
          accessibilityLabel="scan-from-image"
          disabled={loading}
        >
          {loading ? 'Processing…' : 'Read from test image'}
        </Button>

        <Box marginTop={20}>
          <TextInput
            variant="prescription"
            label="Or paste token"
            placeholder="e.g. RX-ABCDE-12345"
            autoCapitalize="characters"
            value={manual}
            onChangeText={setManual}
            accessibilityLabel="manual-token-input"
          />
          <Button
            variant="secondary"
            onPress={loading ? undefined : handleFromManual}
            disabled={loading}
            boxProps={{ marginTop: 12 }}
          >
            Add with pasted token
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
