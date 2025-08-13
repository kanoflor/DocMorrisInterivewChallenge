import { Box, Button, Text } from '../../../shared/components';
import { CartItem as CartItemType } from '../../../store/slices/cart';
import { QuantitySelector } from './QuantitySelector';

interface CartItemProps {
  item: CartItemType;
  handleRemoveItem: (id: string) => void;
}

export const CartItem = ({ item, handleRemoveItem }: CartItemProps) => {
  return (
    <Box
      key={item.id}
      backgroundColor="surface"
      borderRadius="md"
      padding={16}
      marginBottom={12}
    >
      <Box flexDirection="row">
        <Box
          width={80}
          height={80}
          backgroundColor="divider"
          borderRadius="sm"
          marginRight={12}
          alignItems="center"
          justifyContent="center"
        >
          <Text variant="caption2">IMG</Text>
        </Box>

        <Box flex={1}>
          <Text variant="caption1" color="textMuted" marginBottom={4}>
            BRAND
          </Text>
          <Text variant="body2" marginBottom={8}>
            {item.name}
          </Text>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <QuantitySelector itemId={item.id} quantity={item.qty} />
            <Text variant="title3">{item.price.toFixed(2)}€</Text>
          </Box>
        </Box>
      </Box>

      <Button
        variant="link"
        onPress={() => handleRemoveItem(item.id)}
        textColor="textMuted"
        boxProps={{ marginTop: 12 }}
      >
        Remove
      </Button>
    </Box>
  );
};
