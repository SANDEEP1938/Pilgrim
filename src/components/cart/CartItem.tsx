import React, { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { CartItem as CartItemType } from '../../types/cart';
import { QuantityStepper } from './QuantityStepper';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
  removing?: boolean;
}

export function CartItem({ item, onRemove, onUpdateQuantity, removing }: CartItemProps) {
  const heightAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (removing) {
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: 0, duration: 400, useNativeDriver: false }),
        Animated.timing(heightAnim, { toValue: 0, duration: 400, useNativeDriver: false }),
      ]).start();
    }
  }, [removing, heightAnim, opacityAnim]);

  const saved = (item.originalPrice - item.price) * item.quantity;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          maxHeight: heightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }),
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Pressable onPress={onRemove}>
            <MaterialIcons name="close" size={20} color={Colors.outline} />
          </Pressable>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price * item.quantity}</Text>
          {saved > 0 && (
            <View style={styles.savedBadge}>
              <Text style={styles.savedText}>₹{saved} Saved!</Text>
            </View>
          )}
        </View>
        <View style={styles.bottomRow}>
          <QuantityStepper
            quantity={item.quantity}
            onDecrease={() => onUpdateQuantity(item.quantity - 1)}
            onIncrease={() => onUpdateQuantity(item.quantity + 1)}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainer,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    ...Typography.bodyMd,
    color: Colors.onSurface,
    flex: 1,
    marginRight: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  price: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
  },
  savedBadge: {
    backgroundColor: 'rgba(0, 104, 118, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  savedText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
  },
  bottomRow: {
    marginTop: 12,
  },
});
