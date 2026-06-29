import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'yellow' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export function Button({ title, onPress, variant = 'yellow', disabled, style, icon }: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled}>
      <Animated.View style={[styles.base, styles[variant], disabled && styles.disabled, style, { transform: [{ scale }] }]}>
        {icon}
        <Text style={[styles.text, styles[`${variant}Text` as keyof typeof styles]]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  yellow: {
    backgroundColor: Colors.secondaryFixed,
  },
  outline: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
  },
  disabled: {
    backgroundColor: Colors.surfaceContainerHigh,
    opacity: 0.7,
  },
  text: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  primaryText: {
    color: Colors.onPrimary,
  },
  yellowText: {
    color: Colors.onSecondaryFixed,
  },
  outlineText: {
    color: Colors.outline,
  },
});
