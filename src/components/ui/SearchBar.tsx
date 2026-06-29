import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { products } from '../../constants/mockData';

const PHRASES = [
  'Search for body lotion',
  'Search for serum',
  'Search for shampoo',
  'Search for moisturizer',
];

function findProductMatch(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return undefined;
  return products.find((product) => product.name.toLowerCase().includes(normalized));
}

function navigateForQuery(router: ReturnType<typeof useRouter>, query: string) {
  const match = findProductMatch(query);
  if (match) {
    router.push(`/product/${match.id}`);
    return;
  }
  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
}

interface SearchBarProps {
  editable?: boolean;
  autoFocus?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

export function SearchBar({
  editable = false,
  autoFocus = false,
  value,
  onChangeText,
  onSubmitEditing,
}: SearchBarProps) {
  const router = useRouter();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(5)).current;

  useEffect(() => {
    if (editable) return;

    const animate = () => {
      opacity.setValue(0);
      translateY.setValue(5);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    };

    animate();
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      animate();
    }, 3000);

    return () => clearInterval(interval);
  }, [editable, opacity, translateY]);

  const handleSubmit = () => {
    if (onSubmitEditing) {
      onSubmitEditing();
      return;
    }
    const query = value?.trim() ?? '';
    if (!query) return;
    navigateForQuery(router, query);
  };

  if (editable) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="search" size={20} color={Colors.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search products..."
          placeholderTextColor={Colors.onSurfaceVariant}
          autoFocus={autoFocus}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    );
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <MaterialIcons name="search" size={20} color={Colors.primary} style={styles.icon} />
      <Animated.Text style={[styles.text, { opacity, transform: [{ translateY }] }]}>
        {PHRASES[phraseIndex]}
      </Animated.Text>
    </View>
  );
}

export { findProductMatch, navigateForQuery };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: 999,
    height: 40,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    ...Typography.bodySm,
    color: Colors.onSurface,
    padding: 0,
  },
});
