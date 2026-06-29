import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface BottomTabBarItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  active?: boolean;
}

export function BottomTabBarItem({ icon, label, active }: BottomTabBarItemProps) {
  return (
    <View style={styles.tab}>
      <MaterialIcons
        name={icon}
        size={24}
        color={active ? Colors.primary : Colors.onSurfaceVariant}
        style={{ opacity: active ? 1 : 0.7 }}
      />
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  labelActive: {
    color: Colors.primary,
    opacity: 1,
  },
});
