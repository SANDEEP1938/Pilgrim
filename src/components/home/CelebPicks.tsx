import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { CelebPick } from '../../types/product';

interface CelebPicksProps {
  celebs: CelebPick[];
}

export function CelebPicks({ celebs }: CelebPicksProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Celeb Picks</Text>
      <View style={styles.subtitleWrap}>
        <Text style={styles.subtitle}>Essentials you Can't Miss!</Text>
        <View style={styles.underline}>
          <View style={styles.underlineActive} />
        </View>
      </View>
      <View style={styles.row}>
        {celebs.map((celeb) => (
          <View key={celeb.id} style={styles.celebItem}>
            <View style={[styles.avatarWrap, celeb.featured && styles.avatarFeatured]}>
              <Image source={{ uri: celeb.image }} style={styles.avatar} />
            </View>
            <Text style={[styles.name, celeb.featured && styles.nameFeatured]}>{celeb.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: Spacing.stackLg,
    alignItems: 'center',
  },
  title: {
    ...Typography.headlineLgMobile,
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitleWrap: {
    marginBottom: 32,
    alignItems: 'center',
  },
  subtitle: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  underline: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(0, 104, 118, 0.2)',
    borderRadius: 2,
    marginTop: 8,
  },
  underlineActive: {
    width: 60,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  celebItem: {
    alignItems: 'center',
    gap: 8,
  },
  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: Colors.primaryContainer,
    padding: 4,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  avatarFeatured: {
    borderColor: Colors.primary,
    transform: [{ scale: 1.1 }],
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  name: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
  },
  nameFeatured: {
    color: Colors.primary,
  },
});
