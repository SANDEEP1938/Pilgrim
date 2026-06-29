import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { DealCard } from '../../types/product';

interface StealTheDealProps {
  deals: DealCard[];
}

export function StealTheDeal({ deals }: StealTheDealProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steal the Deal</Text>
      <FlatList
        data={deals}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, !item.unlocked && styles.cardLocked]}>
            <View style={styles.iconWrap}>
              <MaterialIcons
                name={item.unlocked ? 'lock-open' : 'lock'}
                size={18}
                color={item.unlocked ? Colors.secondaryFixedDim : Colors.outline}
              />
            </View>
            <Text style={[styles.cardTitle, !item.unlocked && styles.cardTitleLocked]}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.stackLg,
  },
  title: {
    ...Typography.labelCaps,
    color: Colors.outline,
    letterSpacing: 3,
    marginBottom: 16,
  },
  list: {
    gap: 16,
  },
  card: {
    width: 256,
    backgroundColor: 'rgba(253, 212, 0, 0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 225, 112, 0.5)',
    marginRight: 16,
  },
  cardLocked: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderColor: Colors.outlineVariant,
    opacity: 0.7,
  },
  iconWrap: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  cardTitle: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.secondary,
    marginBottom: 4,
  },
  cardTitleLocked: {
    color: Colors.onSurfaceVariant,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
});
