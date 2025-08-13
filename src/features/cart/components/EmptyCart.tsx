import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../screens/navigation';
import { Box, Button, Text } from '../../../shared/components';

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

        <Box
          width={60}
          height={50}
          borderWidth={3}
          borderColor="primary"
          borderRadius="sm"
          position="relative"
          backgroundColor="background"
        >
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

        <Button
          variant="primary"
          onPress={() => navigation.navigate('ERx')}
          boxProps={{ paddingHorizontal: 32 }}
        >
          Scan e-Prescription
        </Button>
      </Box>
    </Box>
  );
};
