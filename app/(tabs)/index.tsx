import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/ui/AppHeader';
import { BannerSkeleton, CategoryTileSkeleton, ProductCardSkeleton, SkeletonLoader } from '../../src/components/ui/SkeletonLoader';
import { CelebPicks } from '../../src/components/home/CelebPicks';
import { CountdownTimer } from '../../src/components/home/CountdownTimer';
import { CategoryGrid } from '../../src/components/home/CategoryGrid';
import { FeaturedIn } from '../../src/components/home/FeaturedIn';
import { HeroBanner } from '../../src/components/home/HeroBanner';
import { PilgrimCode } from '../../src/components/home/PilgrimCode';
import { ProductHorizontalList } from '../../src/components/home/ProductHorizontalList';
import { SectionHeader } from '../../src/components/home/SectionHeader';
import { Testimonials } from '../../src/components/home/Testimonials';
import { Colors } from '../../src/constants/colors';
import {
  categories,
  celebPicks,
  featuredLogos,
  pilgrimCodeItems,
  products,
  testimonials,
} from '../../src/constants/mockData';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';
import { useSkeletonLoader } from '../../src/hooks/useSkeletonLoader';

export default function HomeScreen() {
  const loading = useSkeletonLoader(1500);
  const bestsellers = products.slice(0, 3);
  const makeupProducts = products.filter((p) => p.category === 'makeup');

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader />
        <ScrollView style={styles.scroll}>
          <BannerSkeleton />
          <View style={styles.skeletonGrid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <CategoryTileSkeleton key={i} />
            ))}
          </View>
          <View style={styles.skeletonProducts}>
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <HeroBanner />
        <CountdownTimer />
        <CategoryGrid categories={categories} />
        <SectionHeader title="Bestsellers" subtitle="Top rated by our community" />
        <ProductHorizontalList products={bestsellers} />
        <View style={styles.makeupSection}>
          <SectionHeader title="Skincare Infused Makeup" subtitle="Glow while you wear" />
          <ProductHorizontalList products={makeupProducts} cardWidth={180} />
        </View>
        <CelebPicks celebs={celebPicks} />
        <PilgrimCode items={pilgrimCodeItems} />
        <View style={styles.promise}>
          <Text style={styles.promiseTitle}>Our Promise</Text>
          <Text style={styles.promiseText}>
            At Pilgrim, we are <Text style={styles.bold}>Clean Compatible</Text>. We use effective ingredients that either{' '}
            <Text style={styles.bold}>support the skin's health</Text> or{' '}
            <Text style={styles.bold}>support the formulation</Text>. No fluff, no harmful fillers—just results.
          </Text>
        </View>
        <Testimonials testimonials={testimonials} />
        <FeaturedIn logos={featuredLogos} />
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>PILGRIM</Text>
          <Text style={styles.footerSub}>Secrets of Beauty from Around the World</Text>
          <Text style={styles.copyright}>© 2024 Pilgrim. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.marginMobile,
    gap: 16,
  },
  skeletonProducts: {
    flexDirection: 'row',
    padding: Spacing.marginMobile,
    gap: 16,
  },
  makeupSection: {
    paddingVertical: Spacing.stackLg,
    backgroundColor: 'rgba(240, 237, 237, 0.5)',
  },
  promise: {
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: Spacing.stackLg,
    alignItems: 'center',
  },
  promiseTitle: {
    ...Typography.headlineLgMobile,
    fontSize: 24,
    marginBottom: 16,
    color: Colors.onSurface,
  },
  promiseText: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22,
  },
  bold: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  footer: {
    backgroundColor: 'rgba(234, 231, 231, 0.4)',
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerLogo: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: Colors.primary,
    letterSpacing: -1,
    marginBottom: 8,
  },
  footerSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    opacity: 0.7,
    marginBottom: 32,
  },
  copyright: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    opacity: 0.6,
  },
});
