import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../shared/components/Box';
import { Text } from '../shared/components/Text';
import theme from '../theme';
import { RootStackParamList } from './navigation';

export default function HomeScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['bottom', 'left', 'right']}
    >
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

        <Pressable onPress={() => nav.navigate('ERx')}>
          <Box
            backgroundColor="cta"
            borderRadius="sm"
            paddingVertical={12}
            alignItems="center"
          >
            <Text variant="buttonMd">Scan e‑Prescription</Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => nav.navigate('Cart')}>
          <Box
            marginTop={12}
            backgroundColor="primary"
            borderRadius="sm"
            paddingVertical={12}
            alignItems="center"
          >
            <Text variant="buttonMd">Open Cart</Text>
          </Box>
        </Pressable>
      </Box>
    </SafeAreaView>
  );
}
