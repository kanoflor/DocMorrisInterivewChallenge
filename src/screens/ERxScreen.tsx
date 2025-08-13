import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
  mockDecodeFromImage,
  mockFetchPrescription,
} from '../features/erx/mock';
import { Box, Button, Text, TextInput } from '../shared/components';
import { addItem } from '../store/slices/cart';
import { setToken } from '../store/slices/erx';
import theme from '../theme';
import { RootStackParamList } from './navigation';

export default function ERxScreen() {
  const [manual, setManual] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const processPrescriptionToken = async (token: string) => {
    try {
      setLoading(true);
      dispatch(setToken(token));
      const prescriptions = await mockFetchPrescription(token);

      prescriptions.forEach(rx => {
        dispatch(
          addItem({ id: rx.id, name: rx.name, qty: rx.qty, price: rx.price }),
        );
      });

      Alert.alert(
        'Added to cart',
        `${prescriptions.length} items added with token: ${token}`,
      );
      navigation.navigate('Cart');
    } finally {
      setLoading(false);
    }
  };

  const handleFromImage = async () => {
    const token = await mockDecodeFromImage();
    await processPrescriptionToken(token);
  };

  const handleFromManual = async () => {
    if (!manual.trim()) return;
    const token = manual.trim();
    await processPrescriptionToken(token);
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
          loading={loading}
          disabled={loading}
        >
          Read from test image
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
