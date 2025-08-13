import React, { useState } from 'react';
import { Alert, Pressable, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Box } from '../shared/components/Box';
import { Text } from '../shared/components/Text';
import { addItem } from '../store/slices/cart';
import { setToken } from '../store/slices/erx';
import theme from '../theme';
import { RootStackParamList } from './navigation';

const mockDecodeFromImage = async (): Promise<string> => {
  // TODO: VisionCamera+code-scanner や zxing に差し替え
  await new Promise(r => setTimeout(r, 500));
  return 'RX-TOKEN-1234-MOCK';
};

const mockFetchPrescription = async (token: string) => {
  // TODO: MSW で差し替え可能
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
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFromImage = async () => {
    try {
      setBusy(true);
      const token = await mockDecodeFromImage();
      dispatch(setToken(token));
      const rx = await mockFetchPrescription(token);
      dispatch(
        addItem({ id: rx.id, name: rx.name, qty: rx.qty, price: rx.price }),
      );
      Alert.alert('Added to cart', `Token: ${token}`);
      nav.navigate('Cart');
    } finally {
      setBusy(false);
    }
  };

  const handleFromManual = async () => {
    if (!manual.trim()) return;
    try {
      setBusy(true);
      const token = manual.trim();
      dispatch(setToken(token));
      const rx = await mockFetchPrescription(token);
      dispatch(
        addItem({ id: rx.id, name: rx.name, qty: rx.qty, price: rx.price }),
      );
      Alert.alert('Added to cart', `Token: ${token}`);
      nav.navigate('Cart');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['bottom', 'left', 'right']}
    >
      <Box flex={1} padding={16}>
        <Text variant="body2" marginBottom={16}>
          Use a test image or paste a token. (Camera/NFC are mocked on
          simulator.)
        </Text>

        <Pressable
          onPress={busy ? undefined : handleFromImage}
          accessibilityLabel="scan-from-image"
        >
          <Box
            backgroundColor="cta"
            borderRadius="md"
            paddingVertical={12}
            alignItems="center"
            opacity={busy ? 0.6 : 1}
          >
            <Text variant="buttonMd">
              {busy ? 'Processing…' : 'Read from test image'}
            </Text>
          </Box>
        </Pressable>

        <Box marginTop={20}>
          <Text variant="label" marginBottom={8}>
            Or paste token
          </Text>
          <Box
            borderWidth={1}
            borderColor="border"
            borderRadius="md"
            padding={12}
          >
            <TextInput
              placeholder="e.g. RX-ABCDE-12345"
              autoCapitalize="characters"
              value={manual}
              onChangeText={setManual}
              style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}
              accessibilityLabel="manual-token-input"
            />
          </Box>
          <Pressable onPress={busy ? undefined : handleFromManual}>
            <Box
              marginTop={12}
              backgroundColor="primary"
              borderRadius="md"
              paddingVertical={12}
              alignItems="center"
              opacity={busy ? 0.6 : 1}
            >
              <Text variant="buttonMd">Add with pasted token</Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
