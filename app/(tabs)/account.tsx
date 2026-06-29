import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AppHeader } from '../../src/components/ui/AppHeader';
import { Button } from '../../src/components/ui/Button';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader showSearch={false} title="Account" />
      <View style={styles.content}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={48} color={Colors.primary} />
        </View>
        <Text style={styles.name}>Welcome to Pilgrim</Text>
        <Text style={styles.subtitle}>Sign in to track orders, save favorites, and more.</Text>
        <Button title="Sign In" variant="primary" style={styles.btn} />
        <Button title="Create Account" variant="outline" style={styles.btn} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.marginMobile,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(0, 104, 118, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  name: {
    ...Typography.headlineLgMobile,
    fontSize: 22,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 32,
  },
  btn: {
    width: '100%',
    marginBottom: 12,
  },
});
