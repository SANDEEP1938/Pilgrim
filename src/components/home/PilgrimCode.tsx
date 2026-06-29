import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';

const ICON_MAP: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  eco: 'eco',
  biotech: 'biotech',
  verified: 'verified',
  'cruelty-free': 'pets',
  science: 'science',
  recycling: 'recycling',
};

interface PilgrimCodeItem {
  icon: string;
  label: string;
}

interface PilgrimCodeProps {
  items: PilgrimCodeItem[];
}

export function PilgrimCode({ items }: PilgrimCodeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Pilgrim Code</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.label} style={styles.item}>
            <View style={styles.iconWrap}>
              <MaterialIcons name={ICON_MAP[item.icon] ?? 'verified'} size={28} color={Colors.primary} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.stackLg,
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
  },
  title: {
    ...Typography.headlineLgMobile,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 32,
    color: Colors.onSurface,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  item: {
    width: '33.33%',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  iconWrap: {
    width: 48,
    height: 48,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 9,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.onSurface,
    lineHeight: 12,
  },
});
