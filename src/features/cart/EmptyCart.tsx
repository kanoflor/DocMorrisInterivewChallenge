import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { RootStackParamList } from '../../screens/navigation';
import { Box } from '../../shared/components/Box';
import { Text } from '../../shared/components/Text';

const EmptyCartIllustration = () => {
  return (
    <Box marginBottom={32}>
      <Box
        width={120}
        height={120}
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {/* Background decorative elements */}
        <Box
          position="absolute"
          width={100}
          height={20}
          backgroundColor="divider"
          borderRadius="pill"
          top={10}
          left={-10}
        />
        <Box
          position="absolute"
          width={80}
          height={20}
          backgroundColor="divider"
          borderRadius="pill"
          top={30}
          right={-5}
        />
        <Box
          position="absolute"
          width={90}
          height={20}
          backgroundColor="divider"
          borderRadius="pill"
          top={50}
          left={5}
        />
        <Box
          position="absolute"
          width={70}
          height={20}
          backgroundColor="divider"
          borderRadius="pill"
          bottom={10}
          right={10}
        />

        {/* Shopping cart icon */}
        <Box
          width={60}
          height={50}
          borderWidth={3}
          borderColor="primary"
          borderRadius="sm"
          position="relative"
          backgroundColor="background"
        >
          {/* Cart handle */}
          <Box
            position="absolute"
            top={-8}
            left={-8}
            width={20}
            height={20}
            borderWidth={3}
            borderColor="primary"
            borderRadius="sm"
            backgroundColor="background"
          />

          {/* Sparkle lines */}
          <Box
            position="absolute"
            top={-15}
            left={15}
            width={2}
            height={12}
            backgroundColor="primary"
          />
          <Box
            position="absolute"
            top={-12}
            left={25}
            width={2}
            height={8}
            backgroundColor="primary"
          />
          <Box
            position="absolute"
            top={-10}
            left={35}
            width={2}
            height={6}
            backgroundColor="primary"
          />
        </Box>

        {/* Cart wheels */}
        <Box
          position="absolute"
          bottom={-15}
          left={15}
          width={12}
          height={12}
          borderWidth={3}
          borderColor="primary"
          borderRadius="pill"
          backgroundColor="background"
        />
        <Box
          position="absolute"
          bottom={-15}
          right={15}
          width={12}
          height={12}
          borderWidth={3}
          borderColor="primary"
          borderRadius="pill"
          backgroundColor="background"
        />
      </Box>
    </Box>
  );
};

export const EmptyCart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Box flex={1} minHeight={600}>
      <Box flex={1} alignItems="center" justifyContent="center" padding={32}>
        <EmptyCartIllustration />
        <Text variant="title2" textAlign="center" marginBottom={16}>
          Your cart is empty!
        </Text>
        <Text
          variant="body3"
          textAlign="center"
          color="textMuted"
          marginBottom={32}
          maxWidth={280}
        >
          If you don't know where to start, we suggest some products to take
          care of yourself
        </Text>

        {/* View products button */}
        <Pressable onPress={() => navigation.navigate('ERx')}>
          <Box
            backgroundColor="cta"
            borderRadius="md"
            paddingHorizontal={32}
            paddingVertical={12}
            alignItems="center"
          >
            <Text variant="buttonMd">Scan e-Prescription</Text>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
};
