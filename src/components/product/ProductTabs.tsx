import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface ProductTabsProps {
  description: string;
  howToUse: string;
}

export function ProductTabs({ description, howToUse }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'howToUse'>('description');
  const underlineX = useRef(new Animated.Value(0)).current;
  const tabWidth = useRef(0);

  const switchTab = (tab: 'description' | 'howToUse') => {
    setActiveTab(tab);
    Animated.spring(underlineX, {
      toValue: tab === 'description' ? 0 : tabWidth.current,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.tabRow}
        onLayout={(e) => {
          tabWidth.current = e.nativeEvent.layout.width / 2;
        }}
      >
        <Pressable style={styles.tab} onPress={() => switchTab('description')}>
          <Text style={[styles.tabText, activeTab === 'description' && styles.tabTextActive]}>Description</Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => switchTab('howToUse')}>
          <Text style={[styles.tabText, activeTab === 'howToUse' && styles.tabTextActive]}>How to Use</Text>
        </Pressable>
        <Animated.View
          style={[
            styles.underline,
            {
              width: '50%',
              transform: [{ translateX: underlineX }],
            },
          ]}
        />
      </View>
      <Text style={styles.content}>{activeTab === 'description' ? description : howToUse}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    ...Typography.bodyMd,
    color: Colors.onSurfaceVariant,
  },
  tabTextActive: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: Colors.primary,
  },
  content: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
  },
});
