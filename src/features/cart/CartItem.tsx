import { Pressable } from 'react-native';
import { Box } from '../../shared/components/Box';
import { Text } from '../../shared/components/Text';
import { CartItem as CartItemType } from '../../store/slices/cart';
import { QuantitySelector } from './QuantitySelector';

type CartItemProps = {
  item: CartItemType;
  handleQuantityChange: (id: string, qty: number) => void;
  handleRemoveItem: (id: string) => void;
};

export const CartItem = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
}: CartItemProps) => {
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
            <QuantitySelector
              quantity={item.qty}
              onIncrease={() => handleQuantityChange(item.id, item.qty + 1)}
              onDecrease={() => handleQuantityChange(item.id, item.qty - 1)}
            />
            <Text variant="title3">{item.price.toFixed(2)}€</Text>
          </Box>
        </Box>
      </Box>

      <Pressable
        onPress={() => handleRemoveItem(item.id)}
        style={{ marginTop: 12 }}
      >
        <Box flexDirection="row" alignItems="center">
          <Text variant="buttonLink" color="textMuted">
            Remove
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
