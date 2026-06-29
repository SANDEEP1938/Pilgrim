import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface PriceDetailsProps {
  totalMRP: number;
  discount: number;
  finalTotal: number;
}

export function PriceDetails({ totalMRP, discount, finalTotal }: PriceDetailsProps) {
  const totalAnim = useRef(new Animated.Value(finalTotal)).current;

  useEffect(() => {
    Animated.timing(totalAnim, {
      toValue: finalTotal,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [finalTotal, totalAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Details</Text>
      <View style={styles.rows}>
        <View style={styles.row}>
          <Text style={styles.label}>Total MRP</Text>
          <Text style={styles.value}>₹{totalMRP}</Text>
        </View>
        {discount > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Coupon Discount</Text>
            <Text style={styles.discount}>-₹{discount}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Shipping Charges</Text>
          <Text style={styles.free}>FREE</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{finalTotal}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingBottom: 32,
  },
  title: {
    ...Typography.labelCaps,
    color: Colors.outline,
    letterSpacing: 3,
    marginBottom: 16,
  },
  rows: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
  },
  value: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
  },
  discount: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: Colors.savingsGreen,
  },
  free: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    marginTop: 4,
  },
  totalLabel: {
    ...Typography.bodyMd,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  totalValue: {
    ...Typography.headlineLgMobile,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: Colors.primary,
  },
});
