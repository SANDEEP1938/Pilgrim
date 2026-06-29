import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface CouponSectionProps {
  code: string;
  description: string;
  applied: boolean;
  onApply: () => void;
  onRemove: () => void;
}

export function CouponSection({ code, description, applied, onApply, onRemove }: CouponSectionProps) {
  return (
    <View style={[styles.container, applied && styles.applied]}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <MaterialIcons name="confirmation-number" size={20} color={Colors.primary} />
        </View>
        <View>
          <View style={styles.codeRow}>
            <Text style={styles.code}>{code}</Text>
            {applied && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
          </View>
          <Text style={[styles.desc, applied && styles.descApplied]}>{description}</Text>
        </View>
      </View>
      <Pressable onPress={applied ? onRemove : onApply}>
        <Text style={styles.action}>{applied ? 'Remove' : 'Apply'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    marginTop: 32,
  },
  applied: {
    borderColor: Colors.successGreen,
    borderWidth: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 104, 118, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  code: {
    ...Typography.bodyMd,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  desc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  descApplied: {
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  action: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
