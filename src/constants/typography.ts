import { StyleSheet } from 'react-native';

export const Typography = StyleSheet.create({
  headlineXl: { fontFamily: 'PlusJakartaSans-ExtraBold', fontSize: 48, lineHeight: 56, letterSpacing: -0.96 },
  headlineLg: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, lineHeight: 40, letterSpacing: -0.32 },
  headlineLgMobile: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 28, lineHeight: 36 },
  productTitle: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 18, lineHeight: 24 },
  bodyMd: { fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, lineHeight: 24 },
  bodySm: { fontFamily: 'PlusJakartaSans-Regular', fontSize: 14, lineHeight: 20 },
  labelCaps: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 12, lineHeight: 16, letterSpacing: 0.6, textTransform: 'uppercase' },
});
