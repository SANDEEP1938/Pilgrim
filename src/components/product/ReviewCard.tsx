import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Review } from '../../types/product';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: review.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.author}>{review.author}</Text>
          <View style={styles.stars}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <MaterialIcons key={i} name="star" size={14} color={Colors.secondaryFixedDim} />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.text}>{review.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
});
