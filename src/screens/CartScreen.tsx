import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';
import { CartItem } from '../features/cart/CartItem';
import { EmptyCart } from '../features/cart/EmptyCart';
import { OrderSummary } from '../features/cart/OrderSummary';
import { Box } from '../shared/components/Box';
import { Text } from '../shared/components/Text';
import type { RootState } from '../store';
import { deleteItem, updateQuantity } from '../store/slices/cart';

export default function CartScreen() {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  const [isFooterVisible, setIsFooterVisible] = useState(true);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const screenHeight = layoutMeasurement.height;
    const contentHeight = contentSize.height;

    const threshold = contentHeight - screenHeight - 200;

    setIsFooterVisible(scrollY < threshold);
  };

  const handleQuantityChange = (id: string, newQty: number) => {
    dispatch(updateQuantity({ id, qty: newQty }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <Box marginBottom={16} marginHorizontal={16}>
                <Box flexDirection="row" alignItems="center" gap={4}>
                  <Text variant="caption1m">Sent by</Text>
                  <Text variant="caption1" color="cta">
                    Promofarma Logistics
                  </Text>
                </Box>
              </Box>

              <Box
                marginHorizontal={16}
                marginBottom={16}
                backgroundColor="surface"
                borderRadius="sm"
              >
                <Box paddingHorizontal={16} paddingTop={16}>
                  <Text variant="body1" marginBottom={4}>
                    You will receive it between Thursday 14 and Monday 18.
                  </Text>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    alignSelf="flex-start"
                    backgroundColor="successBg"
                    borderRadius="sm"
                    paddingHorizontal={8}
                  >
                    <Text variant="caption1" color="success">
                      Guaranteed delivery
                    </Text>
                  </Box>
                </Box>

                <Box height={1} backgroundColor="divider" marginVertical={16} />
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))}
              </Box>

              <OrderSummary
                subtotal={total}
                itemCount={items.length}
                discount={1}
                shippingFee={0}
              />
            </>
          )}
        </ScrollView>

        {items.length > 0 && isFooterVisible && (
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            backgroundColor="surface"
            padding={16}
            style={styles.footer}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              gap={24}
              paddingHorizontal={16}
            >
              <Box gap={4}>
                <Box flexDirection="row" alignItems="center" gap={4}>
                  <Text variant="title3">Total</Text>
                  <Text variant="title3" fontWeight="bold">
                    €{total.toFixed(2)}
                  </Text>
                </Box>
                <Pressable>
                  <Text variant="buttonLink">View details</Text>
                </Pressable>
              </Box>

              <Box flexDirection="row" gap={8} flex={1}>
                <Pressable style={styles.buttonFlex}>
                  <Box
                    backgroundColor="cta"
                    borderRadius="md"
                    paddingVertical={12}
                    alignItems="center"
                  >
                    <Text variant="buttonMd">Continue</Text>
                  </Box>
                </Pressable>

                <Pressable style={styles.buttonFlex}>
                  <Box
                    borderRadius="md"
                    paddingVertical={12}
                    alignItems="center"
                    style={styles.applePayButton}
                  >
                    <Text variant="buttonMd" color="onPrimary">
                      🍎 Pay
                    </Text>
                  </Box>
                </Pressable>
              </Box>
            </Box>
          </Box>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
  footer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonFlex: {
    flex: 1,
  },
  applePayButton: {
    backgroundColor: '#000',
  },
});
