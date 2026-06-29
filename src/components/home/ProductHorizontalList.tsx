import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spacing } from '../../constants/spacing';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductHorizontalListProps {
  products: Product[];
  cardWidth?: number;
}

export function ProductHorizontalList({ products, cardWidth = 160 }: ProductHorizontalListProps) {
  return (
    <FlatList
      data={products}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <ProductCard product={item} width={cardWidth} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.marginMobile,
    paddingBottom: 16,
    gap: 16,
  },
  item: {
    marginRight: 16,
  },
});
