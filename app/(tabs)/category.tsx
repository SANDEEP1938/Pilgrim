import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/ui/AppHeader';
import { CategoryGrid } from '../../src/components/home/CategoryGrid';
import { ProductHorizontalList } from '../../src/components/home/ProductHorizontalList';
import { SectionHeader } from '../../src/components/home/SectionHeader';
import { Colors } from '../../src/constants/colors';
import { categories, products } from '../../src/constants/mockData';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

export default function CategoryScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader showSearch={false} title="Categories" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Shop by Category</Text>
        <CategoryGrid categories={categories} />
        <SectionHeader title="All Products" subtitle="Browse our collection" />
        <ProductHorizontalList products={products} />
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
  heading: {
    ...Typography.headlineLgMobile,
    fontSize: 22,
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.stackMd,
    color: Colors.onSurface,
  },
});
