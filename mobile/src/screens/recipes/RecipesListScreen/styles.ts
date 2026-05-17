import { StyleSheet } from 'react-native';

import { colors, radius } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  headerMenuButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  headerMenuIcon: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '800',
  },
  filterActions: {
    gap: 10,
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    minHeight: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    minHeight: 86,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeAvatar: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#e8f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recipeAvatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  cardContent: {
    flex: 1,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  recipeCategory: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textMuted,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  recipeInfo: {
    fontSize: 13,
    color: '#3c4350',
  },
  recipeDot: {
    marginHorizontal: 8,
    color: '#9aa1ac',
  },
  cardChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 64,
    paddingHorizontal: 24,
  },
  emptyIconBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#e8f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyIcon: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: '800',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
