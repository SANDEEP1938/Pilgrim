import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface SkeletonBaseProps {
  style?: ViewStyle;
}

function SkeletonBase({ style }: SkeletonBaseProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.8, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return <Animated.View style={[styles.skeleton, style, { opacity }]} />;
}

export function ProductCardSkeleton() {
  return (
    <View style={styles.productCard}>
      <SkeletonBase style={styles.productImage} />
      <SkeletonBase style={styles.textLine} />
      <SkeletonBase style={styles.textLineShort} />
      <SkeletonBase style={styles.button} />
    </View>
  );
}

export function CategoryTileSkeleton() {
  return (
    <View style={styles.categoryTile}>
      <SkeletonBase style={styles.categorySquare} />
      <SkeletonBase style={styles.categoryLabel} />
    </View>
  );
}

export function BannerSkeleton() {
  return <SkeletonBase style={styles.banner} />;
}

export function ReviewCardSkeleton() {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <SkeletonBase style={styles.avatar} />
        <View>
          <SkeletonBase style={styles.textLineShort} />
          <SkeletonBase style={styles.textLineTiny} />
        </View>
      </View>
      <SkeletonBase style={styles.textLine} />
      <SkeletonBase style={styles.textLine} />
      <SkeletonBase style={styles.textLineShort} />
    </View>
  );
}

interface SkeletonLoaderProps {
  loading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
}

export function SkeletonLoader({ loading, children, skeleton }: SkeletonLoaderProps) {
  if (loading) {
    return skeleton ?? <BannerSkeleton />;
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 8,
  },
  productCard: {
    width: 160,
    gap: 8,
  },
  productImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
  },
  textLine: {
    height: 14,
    width: '100%',
    borderRadius: 4,
  },
  textLineShort: {
    height: 14,
    width: '60%',
    borderRadius: 4,
  },
  textLineTiny: {
    height: 10,
    width: 40,
    borderRadius: 4,
    marginTop: 4,
  },
  button: {
    height: 36,
    width: '100%',
    borderRadius: 8,
  },
  categoryTile: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  categorySquare: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  categoryLabel: {
    height: 12,
    width: 50,
    borderRadius: 4,
  },
  banner: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  reviewCard: {
    width: 280,
    padding: 24,
    gap: 12,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
