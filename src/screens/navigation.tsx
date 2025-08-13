import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from '../screens/CartScreen';
import ERxScreen from '../screens/ERxScreen';
import HomeScreen from '../screens/HomeScreen';
import theme from '../theme';

export type RootStackParamList = {
  Home: undefined;
  ERx: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => {
          const routeOptions = {
            Home: 'DocMorris',
            ERx: 'e‑Prescription',
            Cart: 'Cart',
          };

          return {
            headerStyle: {
              backgroundColor: theme.colors.surface,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTintColor: theme.colors.text,
            headerTitle: '',
            headerBackTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
            },
            headerBackTitle:
              routeOptions[route.name as keyof typeof routeOptions] || '',
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
          };
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ERx" component={ERxScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
