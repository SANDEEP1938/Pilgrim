import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { Testimonial } from '../../types/product';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real Pilgrim Stories</Text>
      <FlatList
        data={testimonials}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.author}>{item.author}</Text>
                <View style={styles.stars}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <MaterialIcons key={i} name="star" size={14} color={Colors.secondaryFixedDim} />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.text}>"{item.text}"</Text>
            <Pressable>
              <Text style={styles.shopLink}>SHOP NOW &gt;</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.stackLg,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  title: {
    ...Typography.headlineLgMobile,
    fontSize: 22,
    paddingHorizontal: Spacing.marginMobile,
    marginBottom: 24,
    color: Colors.onSurface,
  },
  list: {
    paddingHorizontal: Spacing.marginMobile,
    gap: 16,
  },
  card: {
    width: 280,
    backgroundColor: Colors.surfaceContainerLow,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    gap: 16,
    marginRight: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryContainer,
  },
  author: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  stars: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 20,
    color: Colors.onSurfaceVariant,
  },
  shopLink: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
    textDecorationLine: 'underline',
    letterSpacing: 1,
  },
});
