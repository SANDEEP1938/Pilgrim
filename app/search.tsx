import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../src/components/ui/AppHeader';
import { findProductMatch } from '../src/components/ui/SearchBar';
import { SearchResultRow } from '../src/components/ui/SearchResultRow';
import { Colors } from '../src/constants/colors';
import { products } from '../src/constants/mockData';
import { Spacing } from '../src/constants/spacing';
import { Typography } from '../src/constants/typography';
import { Product } from '../src/types/product';

const RECENT_SEARCHES = ['Vitamin C serum', 'Squalane Glow', 'Hair Growth Serum'];

const AUTOCOMPLETE_TERMS = [
  'Search for serum',
  'Search for moisturizer',
  'Search for shampoo',
  'Search for body lotion',
  ...products.map((product) => product.name),
];

function SuggestionRow({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.suggestionRow}>
      <Text style={styles.suggestionText}>{label}</Text>
    </Pressable>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const initialQuery = typeof q === 'string' ? q : '';
  const [query, setQuery] = useState(initialQuery);

  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!normalizedQuery) {
      return RECENT_SEARCHES.slice(0, 3);
    }
    return AUTOCOMPLETE_TERMS.filter((term) => term.toLowerCase().includes(normalizedQuery)).slice(0, 3);
  }, [normalizedQuery]);

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;
    return products.filter((product) => product.name.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  const handleSuggestionPress = (term: string) => {
    const match = findProductMatch(term);
    if (match) {
      router.push(`/product/${match.id}`);
      return;
    }
    setQuery(term);
  };

  const handleSubmit = () => {
    if (!query.trim()) return;
    const match = findProductMatch(query);
    if (match) {
      router.push(`/product/${match.id}`);
      return;
    }
    router.setParams({ q: query.trim() });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.suggestionsSection}>
        {!normalizedQuery ? (
          <Text style={styles.sectionLabel}>Recent Searches</Text>
        ) : null}
        {suggestions.map((term) => (
          <SuggestionRow key={term} label={term} onPress={() => handleSuggestionPress(term)} />
        ))}
      </View>
      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>Products</Text>
        <Pressable onPress={() => setQuery('')}>
          <Text style={styles.viewAll}>View All</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader
        showBack
        searchEditable
        searchValue={query}
        onSearchChangeText={setQuery}
        onSearchSubmit={handleSubmit}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Product }) => (
          <SearchResultRow item={item} onPress={() => router.push(`/product/${item.id}`)} />
        )}
        ListHeaderComponent={renderHeader}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: Spacing.stackLg,
  },
  suggestionsSection: {
    backgroundColor: Colors.surfaceContainerLowest,
  },
  sectionLabel: {
    ...Typography.labelCaps,
    color: Colors.outline,
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.stackMd,
    paddingBottom: Spacing.sm,
  },
  suggestionRow: {
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  suggestionText: {
    ...Typography.bodyMd,
    color: Colors.onSurface,
  },
  productsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingTop: Spacing.stackLg,
    paddingBottom: Spacing.stackMd,
    backgroundColor: Colors.background,
  },
  productsTitle: {
    ...Typography.productTitle,
    color: Colors.onSurface,
  },
  viewAll: {
    ...Typography.bodySm,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
  },
});
