import { StyleSheet } from 'react-native';

import { colors, radius } from '../../styles/theme';

export const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceMuted,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  outline: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
  },
  darkTitle: {
    color: colors.text,
  },
});