import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface QuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  variant?: 'cart' | 'product';
}

export function QuantityStepper({ quantity, onDecrease, onIncrease, variant = 'cart' }: QuantityStepperProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.9, duration: 75, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 75, useNativeDriver: true }),
    ]).start();
  };

  if (variant === 'product') {
    return (
      <View style={styles.productStepper}>
        <Pressable onPress={() => { animatePress(); onDecrease(); }} style={styles.productBtn}>
          <Text style={styles.productBtnText}>−</Text>
        </Pressable>
        <View style={styles.productQty}>
          <Text style={styles.productQtyNum}>{quantity}</Text>
          <Text style={styles.productQtyLabel}>IN CART</Text>
        </View>
        <Pressable onPress={() => { animatePress(); onIncrease(); }} style={styles.productBtn}>
          <Text style={styles.productBtnText}>+</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.cartStepper, { transform: [{ scale }] }]}>
      <Pressable onPress={() => { animatePress(); onDecrease(); }} style={styles.cartBtn}>
        <MaterialIcons name="remove" size={18} color={Colors.primary} />
      </Pressable>
      <Text style={styles.cartQty}>{quantity}</Text>
      <Pressable onPress={() => { animatePress(); onIncrease(); }} style={styles.cartBtn}>
        <MaterialIcons name="add" size={18} color={Colors.primary} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cartStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  cartBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartQty: {
    width: 32,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  productStepper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    height: 56,
  },
  productBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  productBtnText: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onPrimary,
  },
  productQty: {
    alignItems: 'center',
  },
  productQtyNum: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onPrimary,
  },
  productQtyLabel: {
    fontSize: 8,
    color: Colors.onPrimary,
    opacity: 0.8,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
