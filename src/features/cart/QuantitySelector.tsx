import { Pressable } from 'react-native';
import { Box } from '../../shared/components/Box';
import { Text } from '../../shared/components/Text';

export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) => (
  <Box
    flexDirection="row"
    alignItems="center"
    borderWidth={1}
    borderColor="border"
    borderRadius="sm"
  >
    <Pressable onPress={onDecrease}>
      <Box paddingHorizontal={12} paddingVertical={8}>
        <Text variant="body2">−</Text>
      </Box>
    </Pressable>
    <Box
      paddingHorizontal={16}
      paddingVertical={8}
      minWidth={40}
      alignItems="center"
    >
      <Text variant="body2">{quantity}</Text>
    </Box>
    <Pressable onPress={onIncrease}>
      <Box paddingHorizontal={12} paddingVertical={8}>
        <Text variant="body2">+</Text>
      </Box>
    </Pressable>
  </Box>
);
