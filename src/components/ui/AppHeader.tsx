import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { SearchBar } from './SearchBar';

interface AppHeaderProps {
  showSearch?: boolean;
  showBack?: boolean;
  title?: string;
  onBack?: () => void;
  searchEditable?: boolean;
  searchValue?: string;
  onSearchChangeText?: (text: string) => void;
  onSearchSubmit?: () => void;
}

export function AppHeader({
  showSearch = true,
  showBack,
  title,
  onBack,
  searchEditable = false,
  searchValue,
  onSearchChangeText,
  onSearchSubmit,
}: AppHeaderProps) {
  const router = useRouter();
  const count = useCartStore((state) => state.items.reduce((sum, i) => sum + i.quantity, 0));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.9, duration: 75, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 75, useNativeDriver: true }),
    ]).start();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (showBack && searchEditable) {
    return (
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>
        <SearchBar
          editable
          autoFocus
          value={searchValue}
          onChangeText={onSearchChangeText}
          onSubmitEditing={onSearchSubmit}
        />
      </View>
    );
  }

  if (showBack) {
    return (
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <Text style={styles.logo}>PILGRIM</Text>
        )}
        <View style={styles.actions}>
          <Pressable onPress={() => router.push('/search')}>
            <MaterialIcons name="search" size={24} color={Colors.onSurfaceVariant} />
          </Pressable>
          <Pressable onPress={() => toggleWishlist('header')}>
            <MaterialIcons name="favorite-border" size={24} color={Colors.onSurfaceVariant} />
          </Pressable>
          <Pressable onPress={() => router.push('/cart')}>
            <View>
              <MaterialIcons name="shopping-cart" size={24} color={Colors.onSurfaceVariant} />
              {count > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{count}</Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>
      </View>
    );
  }

  if (title && !showSearch) {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      {showSearch && (
        <Pressable style={styles.searchPressable} onPress={() => router.push('/search')}>
          <SearchBar />
        </Pressable>
      )}
      <View style={styles.actions}>
        <Pressable
          onPress={() => {
            animatePress();
            toggleWishlist('header');
          }}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <MaterialIcons name="favorite-border" size={24} color={Colors.onSurfaceVariant} />
          </Animated.View>
        </Pressable>
        <Pressable
          onPress={() => {
            animatePress();
            router.push('/cart');
          }}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <View>
              <MaterialIcons name="shopping-cart" size={24} color={Colors.onSurfaceVariant} />
              {count > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{count}</Text>
                </View>
              )}
            </View>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  searchPressable: {
    flex: 1,
  },
  backBtn: {
    padding: 8,
  },
  logo: {
    ...Typography.headlineLgMobile,
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    letterSpacing: -1,
  },
  title: {
    ...Typography.productTitle,
    color: Colors.onSurface,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onPrimary,
  },
});
