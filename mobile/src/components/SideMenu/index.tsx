import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { styles } from './styles';

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
  onCreateRecipe: () => void;
  onSignOut: () => void;
};

export function SideMenu({
  visible,
  onClose,
  onCreateRecipe,
  onSignOut,
}: SideMenuProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.panel}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Receitas</Text>
              <Text style={styles.subtitle}>Menu principal</Text>
            </View>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.menuItem}
            onPress={() => {
              onClose();
              onCreateRecipe();
            }}
          >
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuItemText}>Nova receita</Text>
              <Text style={styles.menuItemDescription}>
                Cadastrar uma nova receita
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => {
              onClose();
              onSignOut();
            }}
          >
            <View style={styles.menuTextGroup}>
              <Text style={styles.menuItemText}>Sair</Text>
              <Text style={styles.menuItemDescription}>
                Encerrar sessão atual
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}