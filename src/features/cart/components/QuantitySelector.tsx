import { Box, Button, Text } from '../../../shared/components';
import { useQuantitySelector } from '../hooks/useQuantitySelector';

export const QuantitySelector = ({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) => {
  const { handleIncrease, handleDecrease } = useQuantitySelector(
    itemId,
    quantity,
  );

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderWidth={1}
      borderColor="border"
      borderRadius="sm"
    >
      <Button variant="icon" onPress={handleDecrease}>
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
      <Button variant="icon" onPress={handleIncrease}>
        <Text variant="body2">+</Text>
      </Button>
    </Box>
  );
};
