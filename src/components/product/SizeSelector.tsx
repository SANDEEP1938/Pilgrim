import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { ProductSize } from '../../types/product';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected: string;
  onSelect: (size: ProductSize) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>SELECT SIZE</Text>
      <View style={styles.row}>
        {sizes.map((size) => {
          const isSelected = size.label === selected;
          return (
            <Pressable
              key={size.label}
              onPress={() => onSelect(size)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <Text style={[styles.sizeLabel, isSelected && styles.sizeLabelSelected]}>{size.label}</Text>
              <Text style={[styles.sizePrice, isSelected && styles.sizePriceSelected]}>₹{size.price}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  label: {
    ...Typography.labelCaps,
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(0, 104, 118, 0.05)',
  },
  sizeLabel: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.outline,
  },
  sizePrice: {
    fontSize: 12,
    color: Colors.outline,
    marginTop: 2,
  },
  sizeLabelSelected: {
    color: Colors.primary,
  },
  sizePriceSelected: {
    color: Colors.primary,
    opacity: 0.7,
  },
});
