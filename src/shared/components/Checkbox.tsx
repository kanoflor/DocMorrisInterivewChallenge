import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Box } from './Box';
import { Text } from './Text';

export interface CheckboxProps {
  checked?: boolean;
  onChecked?: (checked: boolean) => void;
  size?: number;
}

export function Checkbox({
  checked: controlledChecked,
  onChecked,
  size = 14,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handlePress = () => {
    const newChecked = !isChecked;

    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }

    onChecked?.(newChecked);
  };

  return (
    <Pressable onPress={handlePress}>
      <Box
        width={size}
        height={size}
        borderWidth={1}
        alignItems="center"
        justifyContent="center"
        marginTop={4}
      >
        {isChecked && (
          <Text variant="caption2" color="cta" fontSize={size * 0.6}>
            ✓
          </Text>
        )}
      </Box>
    </Pressable>
  );
}
