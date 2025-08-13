import { Box, Button, Text } from '../../shared/components';

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
    <Button variant="icon" onPress={onDecrease}>
      <Text variant="body2">−</Text>
    </Button>
    <Box
      paddingHorizontal={16}
      paddingVertical={8}
      minWidth={40}
      alignItems="center"
    >
      <Text variant="body2">{quantity}</Text>
    </Box>
    <Button variant="icon" onPress={onIncrease}>
      <Text variant="body2">+</Text>
    </Button>
  </Box>
);
