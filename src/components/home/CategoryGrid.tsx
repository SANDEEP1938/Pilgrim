import React, { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Category } from '../../types/product';

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
}

export function CategoryGrid({ categories, onCategoryPress }: CategoryGridProps) {
  return (
    <FlashList
      data={categories}
      numColumns={4}
      scrollEnabled={false}
      contentContainerStyle={styles.grid}
      renderItem={({ item }) => <CategoryTile category={item} onPress={() => onCategoryPress?.(item)} />}
    />
  );
}

function CategoryTile({ category, onPress }: { category: Category; onPress?: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
      style={styles.tile}
    >
      <Animated.View style={[styles.imageWrap, { transform: [{ scale }] }]}>
        <Image source={{ uri: category.image }} style={styles.image} resizeMode="cover" />
      </Animated.View>
      <Text style={styles.label}>{category.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: Spacing.stackLg,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    marginHorizontal: 6,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    color: Colors.onSurface,
  },
});
