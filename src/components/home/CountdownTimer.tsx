import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { useCountdown } from '../../hooks/useCountdown';

export function CountdownTimer() {
  const { formatted } = useCountdown(6);

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Offer Ends In:</Text>
      </View>
      <Text style={styles.timer}>{formatted}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.timerBackground,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  badge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    ...Typography.labelCaps,
    fontSize: 10,
    color: Colors.onError,
  },
  timer: {
    ...Typography.labelCaps,
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: 2,
  },
});
