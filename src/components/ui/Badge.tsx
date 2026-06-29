import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'ribbon' | 'error';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'primary', style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      <Text style={[styles.text, variant === 'error' && styles.errorText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  ribbon: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  error: {
    backgroundColor: Colors.error,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  text: {
    ...Typography.labelCaps,
    fontSize: 10,
    color: Colors.onPrimary,
    textTransform: 'uppercase',
  },
  errorText: {
    color: Colors.onError,
    fontSize: 10,
  },
});
