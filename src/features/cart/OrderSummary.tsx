import React from 'react';
import { Pressable } from 'react-native';
import { Box } from '../../shared/components/Box';
import { Checkbox } from '../../shared/components/Checkbox';
import { Text } from '../../shared/components/Text';

interface OrderSummaryProps {
  subtotal: number;
  itemCount: number;
  discount?: number;
  shippingFee?: number;
}

export function OrderSummary({
  subtotal,
  itemCount,
  discount = 0,
  shippingFee = 0,
}: OrderSummaryProps) {
  const total = subtotal + shippingFee - discount;
  const products = itemCount > 1 ? 'Products' : 'Product';
  const shippingFeeText =
    shippingFee === 0 ? 'FREE' : `${shippingFee.toFixed(2)}€`;

  return (
    <Box
      marginBottom={16}
      backgroundColor="surface"
      borderRadius="sm"
      padding={16}
    >
      <Box marginBottom={16}>
        <Text variant="title3" fontWeight="bold" marginBottom={16}>
          Order summary
        </Text>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={12}
        >
          <Box flexDirection="row" alignItems="center" gap={8}>
            <Text variant="body1">Subtotal</Text>
            <Text variant="caption1" color="textMuted">
              {itemCount} {products}
            </Text>
          </Box>
          <Text variant="body1sb">{subtotal.toFixed(2)}€</Text>
        </Box>

        {/* Divider */}
        <Box height={1} backgroundColor="divider" marginBottom={16} />

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={12}
        >
          <Box flexDirection="row" alignItems="center" gap={8}>
            <Text variant="body1">Shipping Fee</Text>
            <Text variant="caption1" color="textMuted">
              1 Shipping
            </Text>
          </Box>
          <Text variant="body1sb" fontWeight="bold" color="danger">
            {shippingFeeText}
          </Text>
        </Box>

        <Box marginBottom={16}>
          <Pressable>
            <Text variant="buttonLink" color="cta">
              Do you have any discount?
            </Text>
          </Pressable>
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={8}
        >
          <Text variant="title1" fontWeight="600">
            Total to pay
          </Text>
          <Text variant="title1" fontWeight="600">
            {total.toFixed(2)}€
          </Text>
        </Box>

        {discount > 0 && (
          <Box alignItems="flex-end" marginBottom={12}>
            <Text variant="caption1" color="danger">
              You saved -{discount.toFixed(2)}€
            </Text>
          </Box>
        )}

        <Box flexDirection="row" alignItems="center" gap={8} marginBottom={16}>
          <Box
            width={20}
            height={20}
            borderRadius="pill"
            backgroundColor="success"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="caption2" color="onPrimary">
              ✓
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" gap={4}>
            <Text variant="caption1">Earn</Text>
            <Text variant="caption1" fontWeight="bold">
              161 Health points
            </Text>
            <Text variant="caption1"> with this purchase</Text>
          </Box>
        </Box>

        <Box gap={16} flex={1} marginBottom={16}>
          <Pressable style={{ flex: 1 }}>
            <Box
              backgroundColor="cta"
              borderRadius="sm"
              paddingVertical={8}
              alignItems="center"
            >
              <Text variant="buttonMd">Continue</Text>
            </Box>
          </Pressable>

          <Pressable style={{ flex: 1 }}>
            <Box
              borderRadius="sm"
              paddingVertical={8}
              alignItems="center"
              style={{ backgroundColor: '#000' }}
            >
              <Text variant="buttonMd" color="onPrimary">
                Buy with 🍎 Pay
              </Text>
            </Box>
          </Pressable>
        </Box>

        <Box
          flexDirection="row"
          alignItems="flex-start"
          gap={12}
          marginBottom={16}
        >
          <Checkbox />
          <Box flex={1}>
            <Text variant="body2">
              Add 1€ solidarity to my purchase for the research of skin cancer.
            </Text>
            <Pressable>
              <Text variant="buttonLink" color="textMuted">
                More information
              </Text>
            </Pressable>
            <Text variant="caption1" color="textMuted" marginTop={4}>
              Recauded until now
            </Text>
            <Box
              height={4}
              backgroundColor="text"
              marginTop={4}
              style={{ opacity: 0.3 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
