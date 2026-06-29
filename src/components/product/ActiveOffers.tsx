import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Offer } from '../../types/product';

const ICON_MAP: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  'local-offer': 'local-offer',
  redeem: 'card-giftcard',
};

interface ActiveOffersProps {
  offers: Offer[];
}

export function ActiveOffers({ offers }: ActiveOffersProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>OFFERS FOR YOU</Text>
      <FlatList
        data={offers}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <MaterialIcons name={ICON_MAP[item.icon] ?? 'local-offer'} size={20} color={Colors.primary} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
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
  list: {
    gap: 16,
  },
  card: {
    width: 256,
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onPrimaryContainer,
  },
  description: {
    ...Typography.bodySm,
    color: Colors.onPrimaryContainer,
    opacity: 0.8,
  },
});
