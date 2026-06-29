import React, { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { useCartStore } from '../../store/cartStore';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  width?: number;
  onPress?: () => void;
}

export function ProductCard({ product, width = 160, onPress }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <Pressable onPress={handlePress} style={{ width }}>
      <View style={styles.imageContainer}>
        {product.badge && (
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>{product.badge}</Text>
          </View>
        )}
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        {product.tag && (
          <View style={styles.tag}>
            <MaterialIcons name="verified" size={10} color={Colors.onPrimary} />
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        )}
      </View>
      <View style={styles.ratingRow}>
        <MaterialIcons name="star" size={12} color={Colors.secondary} />
        <Text style={styles.rating}>{product.rating}</Text>
        <Text style={styles.reviewCount}>({product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
      </View>
      <Pressable
        onPress={handleAddToCart}
        onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
      >
        <Animated.View style={[styles.addBtn, { transform: [{ scale }] }]}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ribbon: {
    position: 'absolute',
    top: 0,
    left: 8,
    zIndex: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  ribbonText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onPrimary,
  },
  tag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0, 104, 118, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 9,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  rating: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  reviewCount: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  name: {
    ...Typography.productTitle,
    fontSize: 14,
    marginBottom: 8,
    color: Colors.onSurface,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  price: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: Colors.primary,
  },
  originalPrice: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: Colors.secondaryFixed,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSecondaryFixed,
  },
});
