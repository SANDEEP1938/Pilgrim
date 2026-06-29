import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface RatingBar {
  stars: number;
  percent: number;
}

interface RatingsSectionProps {
  rating: number;
  reviewCount: number;
  distribution: RatingBar[];
}

export function RatingsSection({ rating, reviewCount, distribution }: RatingsSectionProps) {
  const barAnims = useRef(distribution.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    barAnims.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: distribution[i].percent,
        duration: 1000,
        delay: 100,
        useNativeDriver: false,
      }).start();
    });
  }, [barAnims, distribution]);

  return (
    <View style={styles.container}>
      <View style={styles.badges}>
        {['100% Genuine', 'Secure Pay', 'Free Shipping'].map((label) => (
          <View key={label} style={styles.badgeItem}>
            <View style={styles.badgeIcon}>
              <MaterialIcons name="check-circle" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.badgeLabel}>{label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.summary}>
        <View style={styles.scoreBlock}>
          <Text style={styles.score}>{rating}</Text>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <MaterialIcons
                key={i}
                name="star"
                size={14}
                color={Colors.secondary}
                style={{ opacity: i < Math.floor(rating) ? 1 : 0.5 }}
              />
            ))}
          </View>
          <Text style={styles.verified}>{reviewCount} Verified Ratings</Text>
        </View>
        <View style={styles.bars}>
          {distribution.map((bar, i) => (
            <View key={bar.stars} style={styles.barRow}>
              <Text style={styles.barLabel}>{bar.stars}</Text>
              <View style={styles.barTrack}>
                <Animated.View
                  style={[
                    styles.barFill,
                    {
                      width: barAnims[i].interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  badgeItem: {
    alignItems: 'center',
    flex: 1,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 104, 118, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeLabel: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  summary: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
  },
  scoreBlock: {
    alignItems: 'center',
  },
  score: {
    fontSize: 48,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: Colors.primary,
    lineHeight: 48,
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  verified: {
    fontSize: 10,
    color: Colors.outline,
    marginTop: 8,
  },
  bars: {
    flex: 1,
    gap: 8,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    width: 16,
    color: Colors.onSurface,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
});
