import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CartItem } from '../src/components/cart/CartItem';
import { CouponSection } from '../src/components/cart/CouponSection';
import { PriceDetails } from '../src/components/cart/PriceDetails';
import { StealTheDeal } from '../src/components/cart/StealTheDeal';
import { Button } from '../src/components/ui/Button';
import { Colors } from '../src/constants/colors';
import { dealCards } from '../src/constants/mockData';
import { Spacing } from '../src/constants/spacing';
import { Typography } from '../src/constants/typography';
import { useCartStore } from '../src/store/cartStore';

export default function CartScreen() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const getTotalMRP = useCartStore((s) => s.getTotalMRP);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getFinalTotal = useCartStore((s) => s.getFinalTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const handleRemove = (id: string) => {
    setRemovingIds((prev) => [...prev, id]);
    setTimeout(() => {
      removeItem(id);
      setRemovingIds((prev) => prev.filter((i) => i !== id));
    }, 400);
  };

  const itemCount = getItemCount();
  const totalMRP = getTotalMRP();
  const discount = getDiscount();
  const finalTotal = getFinalTotal();

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-300, 300],
  });

  if (items.length === 0 && removingIds.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <View style={styles.empty}>
          <MaterialIcons name="shopping-basket" size={64} color={Colors.outlineVariant} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Looks like you haven't added anything yet.</Text>
          <Button title="Start Shopping" variant="primary" onPress={() => router.push('/(tabs)')} style={styles.emptyBtn} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>
          My Cart <Text style={styles.headerCount}>({itemCount} Products)</Text>
        </Text>
        <Pressable onPress={clearCart} style={styles.clearBtn}>
          <MaterialIcons name="delete-sweep" size={24} color={Colors.outline} />
        </Pressable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removing={removingIds.includes(item.id)}
            onRemove={() => handleRemove(item.id)}
            onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
          />
        ))}
        <StealTheDeal deals={dealCards} />
        <CouponSection
          code="PILGRIM-B1G1"
          description={appliedCoupon ? 'Buy 1 Get 1 FREE Applied' : 'Apply Buy 1 Get 1 FREE'}
          applied={!!appliedCoupon}
          onApply={() => applyCoupon('PILGRIM-B1G1')}
          onRemove={removeCoupon}
        />
        <PriceDetails totalMRP={totalMRP} discount={discount} finalTotal={finalTotal} />
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerTotal}>₹{finalTotal}</Text>
        </View>
        <Pressable style={styles.checkoutBtn}>
          <Animated.View
            style={[styles.shimmer, { transform: [{ translateX: shimmerTranslate }] }]}
          />
          <Text style={styles.checkoutText}>GO TO CHECKOUT</Text>
          <MaterialIcons name="chevron-right" size={24} color={Colors.onSecondaryContainer} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.marginMobile,
    height: 64,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    ...Typography.productTitle,
    color: Colors.onSurface,
    flex: 1,
  },
  headerCount: {
    fontFamily: 'PlusJakartaSans-Regular',
    opacity: 0.6,
  },
  clearBtn: {
    padding: 8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: 16,
    paddingBottom: 120,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.marginMobile,
  },
  emptyTitle: {
    ...Typography.headlineLgMobile,
    color: Colors.onSurface,
    marginTop: 16,
  },
  emptySub: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    marginTop: 8,
  },
  emptyBtn: {
    marginTop: 32,
    width: 200,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 24,
  },
  footerLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  footerTotal: {
    ...Typography.headlineLgMobile,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: Colors.primary,
  },
  checkoutBtn: {
    flex: 1,
    height: 54,
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  checkoutText: {
    ...Typography.bodyMd,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: Colors.onSecondaryContainer,
  },
});
