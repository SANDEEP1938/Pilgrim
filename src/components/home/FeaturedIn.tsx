import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';

interface FeaturedInProps {
  logos: string[];
}

export function FeaturedIn({ logos }: FeaturedInProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const contentWidth = logos.length * 160;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -contentWidth,
        duration: 20000,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [contentWidth, translateX]);

  const doubled = [...logos, ...logos];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>As Seen In</Text>
      <View style={styles.marqueeWrap}>
        <Animated.View style={[styles.marquee, { transform: [{ translateX }] }]}>
          {doubled.map((logo, i) => (
            <Text key={`${logo}-${i}`} style={styles.logo}>{logo}</Text>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.stackLg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.outlineVariant,
    overflow: 'hidden',
  },
  label: {
    ...Typography.labelCaps,
    fontSize: 10,
    textAlign: 'center',
    color: Colors.onSurfaceVariant,
    opacity: 0.6,
    letterSpacing: 3,
    marginBottom: 24,
  },
  marqueeWrap: {
    overflow: 'hidden',
  },
  marquee: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
  },
  logo: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
    opacity: 0.3,
    paddingHorizontal: 16,
  },
});
