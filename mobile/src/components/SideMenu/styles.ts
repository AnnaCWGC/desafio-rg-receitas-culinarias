import { StyleSheet } from 'react-native';

import { colors, radius } from '../../styles/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(17, 24, 39, 0.38)',
  },
  backdrop: {
    flex: 1,
  },
  panel: {
    width: 292,
    backgroundColor: colors.surface,
    paddingTop: 32,
    paddingHorizontal: 18,
    paddingBottom: 24,
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '500',
    color: colors.text,
  },
  menuItem: {
    minHeight: 74,
    borderRadius: radius.lg,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e8f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '800',
  },
  menuTextGroup: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  menuItemDescription: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textMuted,
  },
});