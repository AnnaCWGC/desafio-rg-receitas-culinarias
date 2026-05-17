import { StyleSheet } from 'react-native';

import { colors, radius } from '../../../styles/theme';

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
});