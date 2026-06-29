import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { Button } from '../ui/Button';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    badge: '24 HOURS ONLY SALE',
    title: 'Buy 1 Get 1',
    highlight: 'FREE',
    subtitle: 'Experience high-performance Korean skincare secrets delivered to your doorstep.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsnawcDNfPN3f3JHZTNwYEhasuYEsHKa5gXfKi_9zHAFCr4fp7gMv7nljwRYOg0H9QbmBztst0KvwJaLgwVnY4YaStYaRm3HGOJ7KmRNQTOXRnIcyEDT2ZhdZ8pw2nT0U83jfoxAVFHOknYc7kB_5W0i8mcQbls_ihXp2iSq-vOAIIUIykYdy5EcpccP_Z_D-iBGDVERAP5CqlF5bkIG56JGcqoPj1MgLNlyKDk4CynQ1-q4KScJtcrN3SwT6ml9rXGizOZRQ-3DU',
  },
];

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % SLIDES.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.gradient}>
              <View style={styles.content}>
                <View style={styles.saleBadge}>
                  <Text style={styles.saleBadgeText}>{item.badge}</Text>
                </View>
                <Text style={styles.title}>
                  {item.title} <Text style={styles.highlight}>{item.highlight}</Text>
                </Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Button title="SHOP NOW" variant="yellow" icon={<MaterialIcons name="double-arrow" size={14} color={Colors.onSecondaryFixed} />} />
              </View>
              <Image source={{ uri: item.image }} style={styles.decorImage} resizeMode="cover" />
            </View>
            <View style={styles.footerBar}>
              <Text style={styles.footerText}>Secret Korean Beauty Code: PILGRIM50</Text>
            </View>
          </View>
        )}
      />
      {SLIDES.length > 1 && (
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    aspectRatio: 4 / 5,
    backgroundColor: Colors.primaryContainer,
  },
  slide: {
    width,
    flex: 1,
  },
  gradient: {
    flex: 1,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.marginMobile,
    zIndex: 10,
  },
  saleBadge: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 16,
  },
  saleBadgeText: {
    ...Typography.labelCaps,
    color: Colors.onSecondaryContainer,
    fontSize: 10,
  },
  title: {
    ...Typography.headlineLgMobile,
    color: Colors.onPrimaryContainer,
    textAlign: 'center',
    marginBottom: 8,
  },
  highlight: {
    color: Colors.surfaceContainerLowest,
  },
  subtitle: {
    ...Typography.bodySm,
    color: Colors.onPrimaryContainer,
    opacity: 0.8,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: 24,
  },
  decorImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 0.5,
    height: '100%',
    opacity: 0.4,
  },
  footerBar: {
    height: 32,
    backgroundColor: 'rgba(0, 104, 118, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    ...Typography.labelCaps,
    fontSize: 10,
    color: Colors.onPrimaryContainer,
    letterSpacing: 2,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  dot: {
    width: 8,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.outlineVariant,
  },
  dotActive: {
    width: 32,
    backgroundColor: Colors.primary,
  },
});
