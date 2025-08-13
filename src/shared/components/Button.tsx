import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { Theme } from '../../theme';
import { Box } from './Box';
import { Text } from './Text';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * Button variant that defines the visual style
   */
  variant?: 'primary' | 'secondary' | 'applePay' | 'link' | 'icon';
  /**
   * Button text content
   */
  children: React.ReactNode;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Custom opacity when pressed (defaults to 0.8)
   */
  activeOpacity?: number;
  /**
   * Text variant override for custom text styling
   */
  textVariant?: keyof Theme['textVariants'];
  /**
   * Text color override
   */
  textColor?: keyof Theme['colors'];
  /**
   * Additional props for the underlying Box component
   */
  boxProps?: React.ComponentProps<typeof Box>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  disabled = false,
  loading = false,
  activeOpacity = 0.8,
  textVariant,
  textColor,
  boxProps,
  ...pressableProps
}) => {
  const isDisabled = disabled || loading;

  // Get button styling based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'cta' as keyof Theme['colors'],
          borderRadius: 'sm' as keyof Theme['borderRadii'],
          paddingVertical: 12 as keyof Theme['spacing'],
        };
      case 'secondary':
        return {
          backgroundColor: 'textMuted' as keyof Theme['colors'],
          borderRadius: 'sm' as keyof Theme['borderRadii'],
          paddingVertical: 12 as keyof Theme['spacing'],
        };
      case 'applePay':
        return {
          backgroundColor: 'text' as keyof Theme['colors'],
          borderRadius: 'md' as keyof Theme['borderRadii'],
          paddingVertical: 12 as keyof Theme['spacing'],
        };
      case 'link':
        return {
          backgroundColor: 'transparent' as const,
          paddingVertical: 0 as keyof Theme['spacing'],
          paddingHorizontal: 0 as keyof Theme['spacing'],
        };
      case 'icon':
        return {
          backgroundColor: 'transparent' as const,
          paddingVertical: 8 as keyof Theme['spacing'],
          paddingHorizontal: 12 as keyof Theme['spacing'],
          borderRadius: 'sm' as keyof Theme['borderRadii'],
        };
      default:
        return {
          backgroundColor: 'cta' as keyof Theme['colors'],
          borderRadius: 'sm' as keyof Theme['borderRadii'],
          paddingVertical: 12 as keyof Theme['spacing'],
        };
    }
  };

  // Determine text variant based on button variant if not explicitly provided
  const getTextVariant = () => {
    if (textVariant) return textVariant;

    switch (variant) {
      case 'link':
        return 'buttonLink';
      default:
        return 'buttonMd';
    }
  };

  // Determine text color based on button variant if not explicitly provided
  const getTextColor = () => {
    if (textColor) return textColor;

    switch (variant) {
      case 'primary':
        return 'onCta';
      case 'applePay':
        return 'onPrimary';
      case 'link':
        return 'primary';
      default:
        return 'onCta';
    }
  };

  const buttonStyle = getButtonStyle();

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => ({
        opacity: pressed && !isDisabled ? activeOpacity : isDisabled ? 0.6 : 1,
      })}
      {...pressableProps}
    >
      <Box
        alignItems="center"
        justifyContent="center"
        {...(buttonStyle.backgroundColor !== 'transparent' && {
          backgroundColor: buttonStyle.backgroundColor,
        })}
        borderRadius={buttonStyle.borderRadius}
        paddingVertical={buttonStyle.paddingVertical}
        paddingHorizontal={buttonStyle.paddingHorizontal}
        {...boxProps}
      >
        {typeof children === 'string' ? (
          <Text
            variant={getTextVariant()}
            color={getTextColor()}
            textAlign="center"
          >
            {loading ? 'Loading...' : children}
          </Text>
        ) : (
          children
        )}
      </Box>
    </Pressable>
  );
};
