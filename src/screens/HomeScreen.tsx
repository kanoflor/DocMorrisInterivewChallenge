import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Button, Text } from '../shared/components';
import theme from '../theme';
import { RootStackParamList } from './navigation';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Box
        flex={1}
        backgroundColor="background"
        padding={16}
        justifyContent="center"
      >
        <Text variant="title1" marginBottom={12}>
          Welcome
        </Text>
        <Text variant="body2" marginBottom={24}>
          Scan an e‑prescription or go to your cart.
        </Text>

        <Button variant="primary" onPress={() => navigation.navigate('ERx')}>
          Scan e‑Prescription
        </Button>

        <Button
          variant="secondary"
          onPress={() => navigation.navigate('Cart')}
          boxProps={{ marginTop: 12 }}
        >
          Open Cart
        </Button>
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
