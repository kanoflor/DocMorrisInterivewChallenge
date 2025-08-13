import { useTheme } from '@shopify/restyle';
import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { Theme } from '../../theme';
import { Box } from './Box';
import { Text } from './Text';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /**
   * Input variant that defines the visual style and behavior
   */
  variant?: 'default' | 'search' | 'prescription' | 'number';
  /**
   * Label text displayed above the input
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helper?: string;
  /**
   * Error message - when provided, input shows error state
   */
  error?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Text variant for the input text (defaults based on variant)
   */
  textVariant?: keyof Theme['textVariants'];
  /**
   * Additional props for the container Box component
   */
  containerProps?: React.ComponentProps<typeof Box>;
  /**
   * Additional props for the input wrapper Box component
   */
  inputBoxProps?: React.ComponentProps<typeof Box>;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      variant = 'default',
      label,
      helper,
      error,
      disabled = false,
      textVariant,
      containerProps,
      inputBoxProps,
      ...textInputProps
    },
    ref,
  ) => {
    const theme = useTheme<Theme>();

    // Get input styling based on variant
    const getInputVariantStyles = () => {
      const baseStyles = {
        borderWidth: 1,
        borderRadius: 'sm' as keyof Theme['borderRadii'],
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: 'surface' as keyof Theme['colors'],
      };

      switch (variant) {
        case 'search':
          return {
            ...baseStyles,
            borderColor: 'primary' as keyof Theme['colors'],
            backgroundColor: 'background' as keyof Theme['colors'],
          };
        case 'prescription':
          return {
            ...baseStyles,
            borderColor: 'cta' as keyof Theme['colors'],
            backgroundColor: 'surface' as keyof Theme['colors'],
          };
        case 'number':
          return {
            ...baseStyles,
            borderColor: 'border' as keyof Theme['colors'],
            backgroundColor: 'surface' as keyof Theme['colors'],
          };
        default:
          return {
            ...baseStyles,
            borderColor: 'border' as keyof Theme['colors'],
          };
      }
    };

    // Determine text variant based on input variant if not explicitly provided
    const getTextVariant = (): keyof Theme['textVariants'] => {
      if (textVariant) return textVariant;

      switch (variant) {
        case 'search':
        case 'prescription':
          return 'inputText';
        default:
          return 'body1';
      }
    };

    // Get text input styles from theme
    const inputTextVariant = theme.textVariants[getTextVariant()];
    const inputStyles = getInputVariantStyles();

    // Determine border color based on state
    const getBorderColor = (): keyof Theme['colors'] => {
      if (error) return 'danger';
      if (disabled) return 'divider';
      return inputStyles.borderColor;
    };

    return (
      <Box {...containerProps}>
        {label ? (
          <Text
            variant="label"
            marginBottom={8}
            color={disabled ? 'textMuted' : 'text'}
          >
            {label}
          </Text>
        ) : null}

        <Box
          borderWidth={inputStyles.borderWidth}
          borderColor={getBorderColor()}
          borderRadius={inputStyles.borderRadius}
          backgroundColor={disabled ? 'divider' : inputStyles.backgroundColor}
          opacity={disabled ? 0.6 : 1}
          {...inputBoxProps}
        >
          <RNTextInput
            ref={ref}
            style={{
              fontFamily: inputTextVariant.fontFamily,
              fontSize: inputTextVariant.fontSize,
              lineHeight: inputTextVariant.lineHeight,
              color: disabled
                ? theme.colors.textMuted
                : theme.colors[inputTextVariant.color as keyof Theme['colors']],
              paddingHorizontal: inputStyles.paddingHorizontal,
              paddingVertical: inputStyles.paddingVertical,
              textAlignVertical: 'center',
            }}
            editable={!disabled}
            placeholderTextColor={theme.colors.textMuted}
            {...textInputProps}
          />
        </Box>

        {helper || error ? (
          <Box marginTop={4}>
            <Text variant="helper" color={error ? 'danger' : 'textMuted'}>
              {error || helper}
            </Text>
          </Box>
        ) : null}
      </Box>
    );
  },
);

TextInput.displayName = 'TextInput';
