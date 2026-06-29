import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Product } from '../../types/product';

interface SearchResultRowProps {
  item: Product;
  onPress: () => void;
}

export function SearchResultRow({ item, onPress }: SearchResultRowProps) {
  const rankLabel = item.tag ?? item.badge;

  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.price}>₹{item.price}</Text>
          {rankLabel ? (
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{rankLabel}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={Colors.outline} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.outlineVariant,
    gap: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainer,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  name: {
    ...Typography.bodyMd,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  price: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
  },
  rankBadge: {
    backgroundColor: 'rgba(0, 104, 118, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rankText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
});
