import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export interface AccordionItem {
  title: string;
  description: string;
}

interface AccordionSectionProps {
  title: string;
  description?: string;
  content?: string;
  icon?: string;
  defaultOpen?: boolean;
  items?: AccordionItem[];
}

const ICON_MAP: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  flare: 'flare',
  'verified-user': 'verified-user',
  'water-drop': 'water-drop',
};

function AccordionRow({
  title,
  description,
  icon,
  defaultOpen = false,
}: {
  title: string;
  description: string;
  icon?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;
  const rotation = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: open ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotation, {
        toValue: open ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, animatedHeight, rotation]);

  const onContentLayout = (e: LayoutChangeEvent) => {
    setContentHeight(e.nativeEvent.layout.height);
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Pressable onPress={() => setOpen(!open)} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {icon ? <MaterialIcons name={ICON_MAP[icon] ?? 'info'} size={24} color={Colors.primary} /> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialIcons name="expand-more" size={24} color={Colors.onSurfaceVariant} />
        </Animated.View>
      </View>
      <View style={styles.measureWrap} pointerEvents="none">
        <Text style={styles.description} onLayout={onContentLayout}>
          {description}
        </Text>
      </View>
      <Animated.View
        style={{
          height: animatedHeight.interpolate({ inputRange: [0, 1], outputRange: [0, contentHeight] }),
          overflow: 'hidden',
        }}
      >
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
    </Pressable>
  );
}

export function AccordionSection({ title, description, content, icon, defaultOpen = false, items }: AccordionSectionProps) {
  if (items && items.length > 0) {
    return (
      <View>
        {items.map((item) => (
          <AccordionRow key={item.title} title={item.title} description={item.description} />
        ))}
      </View>
    );
  }

  const descriptionText = description ?? content ?? '';

  return (
    <AccordionRow
      title={title}
      description={descriptionText}
      icon={icon}
      defaultOpen={defaultOpen}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.onSurface,
    flex: 1,
  },
  measureWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    opacity: 0,
    zIndex: -1,
  },
  description: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginTop: 6,
  },
});
