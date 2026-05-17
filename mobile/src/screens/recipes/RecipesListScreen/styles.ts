import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  actions: {
    gap: 8,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
  },
  card: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '700',
  },
  recipeInfo: {
    marginTop: 4,
  },
});