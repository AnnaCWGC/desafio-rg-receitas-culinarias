import { StyleSheet } from 'react-native';

import { colors, radius } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  inputWrapper: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapperMultiline: {
    minHeight: 112,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  icon: {
    fontSize: 16,
    color: colors.textMuted,
    marginRight: 8,
  },
  iconMultiline: {
    marginTop: 2,
  },
  input: {
    flex: 1,
    minHeight: 44,
    color: colors.text,
    paddingVertical: 0,
  },
  inputMultiline: {
    minHeight: 92,
    paddingTop: 0,
  },
});