import React, { useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActiveOffers } from '../../src/components/product/ActiveOffers';
import { AccordionSection } from '../../src/components/product/AccordionSection';
import { ImageCarousel } from '../../src/components/product/ImageCarousel';
import { RatingsSection } from '../../src/components/product/RatingsSection';
import { SizeSelector } from '../../src/components/product/SizeSelector';
import { QuantityStepper } from '../../src/components/cart/QuantityStepper';
import { Colors } from '../../src/constants/colors';
import {
  accordionItems,
  getProductById,
  offers,
  ratingDistribution,
} from '../../src/constants/mockData';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';
import { useCartStore } from '../../src/store/cartStore';
import { ProductSize } from '../../src/types/product';

type AddState = 'default' | 'loading' | 'added';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id ?? '');
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);

  const sizes = product?.sizes ?? [{ label: 'Default', price: product?.price ?? 0 }];
  const [selectedSize, setSelectedSize] = useState<ProductSize>(sizes[0]);
  const [addState, setAddState] = useState<AddState>('default');
  const [cartQty, setCartQty] = useState(1);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const cartItemId = `${product?.id}-${selectedSize.label}`;

  const existingItem = cartItems.find((i) => i.id === cartItemId);

  React.useEffect(() => {
    if (existingItem) {
      setAddState('added');
      setCartQty(existingItem.quantity);
      Animated.spring(widthAnim, { toValue: 1, useNativeDriver: false }).start();
    }
  }, [existingItem, widthAnim]);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </Pressable>
          <View style={styles.headerSpacer} />
          <View style={styles.headerActions}>
            <Pressable onPress={() => router.push('/search')}>
              <MaterialIcons name="search" size={24} color={Colors.onSurfaceVariant} />
            </Pressable>
            <MaterialIcons name="favorite-border" size={24} color={Colors.onSurfaceVariant} />
            <Pressable onPress={() => router.push('/cart')}>
              <MaterialIcons name="shopping-cart" size={24} color={Colors.onSurfaceVariant} />
            </Pressable>
          </View>
        </View>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const images = product.images ?? [product.image];
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleShare = async () => {
    await Share.share({
      message: `Check out ${product.name} on Pilgrim! ₹${selectedSize.price}`,
      title: product.name,
    });
  };

  const handleAddToCart = () => {
    setAddState('loading');
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.5, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    pulse.start();

    setTimeout(() => {
      pulse.stop();
      addItem({
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: selectedSize.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        image: product.image,
        size: selectedSize.label,
      });
      setAddState('added');
      setCartQty(1);
      Animated.spring(widthAnim, { toValue: 1, useNativeDriver: false }).start();
    }, 800);
  };

  const handleQtyChange = (delta: number) => {
    const newQty = cartQty + delta;
    if (newQty <= 0) {
      setAddState('default');
      setCartQty(1);
      widthAnim.setValue(0);
      useCartStore.getState().removeItem(cartItemId);
      return;
    }
    setCartQty(newQty);
    updateQuantity(cartItemId, newQty);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>
        <View style={styles.headerSpacer} />
        <View style={styles.headerActions}>
          <Pressable onPress={() => router.push('/search')}>
            <MaterialIcons name="search" size={24} color={Colors.onSurfaceVariant} />
          </Pressable>
          <MaterialIcons name="favorite-border" size={24} color={Colors.onSurfaceVariant} />
          <Pressable onPress={() => router.push('/cart')}>
            <MaterialIcons name="shopping-cart" size={24} color={Colors.onSurfaceVariant} />
          </Pressable>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <ImageCarousel images={images} />
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{product.name}</Text>
              <Pressable onPress={handleShare}>
                <MaterialIcons name="share" size={24} color={Colors.onSurfaceVariant} />
              </Pressable>
            </View>
            <View style={styles.ratingRow}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{product.rating}</Text>
                <MaterialIcons name="star" size={16} color={Colors.secondary} />
              </View>
              <Text style={styles.divider}>|</Text>
              <Text style={styles.reviewCount}>{product.reviewCount} reviews</Text>
              <View style={styles.crueltyBadge}>
                <Text style={styles.crueltyText}>CRUELTY FREE</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{selectedSize.price}</Text>
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
              <Text style={styles.discount}>{discount}% OFF</Text>
            </View>
            {sizes.length > 1 && (
              <SizeSelector
                sizes={sizes}
                selected={selectedSize.label}
                onSelect={(size) => setSelectedSize(size)}
              />
            )}
            <ActiveOffers offers={offers} />
          </View>
          <View style={styles.whyLove}>
            <Text style={styles.whyTitle}>Why You'll Love It</Text>
            {accordionItems.map((item) => (
              <AccordionSection key={item.id} title={item.title} content={item.content} icon={item.icon} />
            ))}
          </View>
          <View style={styles.ratingsWrap}>
            <RatingsSection
              rating={product.rating}
              reviewCount={product.reviewCount}
              distribution={ratingDistribution}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={styles.bottomPrice}>
            <Text style={styles.bottomPriceValue}>₹{selectedSize.price}</Text>
            <Text style={styles.bottomPriceNote}>Price inclusive of all taxes</Text>
          </View>
          <View style={styles.ctaContainer}>
            {addState === 'default' && (
              <Pressable style={styles.addBtn} onPress={handleAddToCart}>
                <MaterialIcons name="shopping-bag" size={20} color={Colors.onSecondaryFixed} />
                <Text style={styles.addBtnText}>ADD TO CART</Text>
              </Pressable>
            )}
            {addState === 'loading' && (
              <Animated.View style={[styles.addBtn, styles.loadingBtn, { opacity: pulseAnim }]}>
                <Text style={styles.addBtnText}>Adding...</Text>
              </Animated.View>
            )}
            {addState === 'added' && (
              <Animated.View style={[styles.stepperWrap, { flex: widthAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }]}>
                <QuantityStepper
                  quantity={cartQty}
                  onDecrease={() => handleQtyChange(-1)}
                  onIncrease={() => handleQtyChange(1)}
                  variant="product"
                />
              </Animated.View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    ...Typography.bodyMd,
    color: Colors.onSurfaceVariant,
  },
  info: {
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.stackLg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    ...Typography.productTitle,
    color: Colors.onSurface,
    flex: 1,
    marginRight: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 212, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  ratingText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: Colors.onSecondaryContainer,
  },
  divider: {
    color: Colors.outline,
  },
  reviewCount: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
  },
  crueltyBadge: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  crueltyText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurfaceVariant,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 24,
  },
  price: {
    ...Typography.headlineLg,
    color: Colors.primary,
  },
  originalPrice: {
    ...Typography.bodyMd,
    color: Colors.outline,
    textDecorationLine: 'line-through',
  },
  discount: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.error,
  },
  whyLove: {
    backgroundColor: '#F0FFF8',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: Spacing.stackLg,
  },
  whyTitle: {
    ...Typography.headlineLgMobile,
    color: Colors.primary,
    marginBottom: 24,
  },
  ratingsWrap: {
    paddingHorizontal: Spacing.marginMobile,
  },
  bottomBar: {
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
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 8,
    height: 80,
  },
  bottomPrice: {},
  bottomPriceValue: {
    ...Typography.headlineLg,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
  },
  bottomPriceNote: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  ctaContainer: {
    width: '60%',
    height: 56,
  },
  addBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.secondaryFixed,
    borderRadius: 12,
    height: 56,
  },
  loadingBtn: {
    backgroundColor: Colors.surfaceContainerHigh,
  },
  addBtnText: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSecondaryFixed,
  },
  stepperWrap: {
    height: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.marginMobile,
    height: 64,
    backgroundColor: Colors.surface,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
  },
  backBtn: {
    padding: 8,
  },
  headerSpacer: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
