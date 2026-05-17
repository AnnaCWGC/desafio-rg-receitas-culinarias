import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { ChevronIcon } from '../ChevronIcon';
import { styles } from './styles';

export type DropdownOption = {
  label: string;
  value: number | null;
};

type DropdownSelectProps = {
  label: string;
  value: number | null;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: number | null) => void;
};

export function DropdownSelect({
  label,
  value,
  options,
  placeholder = 'Selecione uma opção',
  disabled = false,
  onChange,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value);
  }, [options, value]);

  function handleSelect(option: DropdownOption) {
    onChange(option.value);
    setIsOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={[styles.trigger, disabled && styles.triggerDisabled]}
        disabled={disabled}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.triggerText, !selectedOption && styles.placeholderText]}>
          {selectedOption?.label ?? placeholder}
        </Text>

        <ChevronIcon direction="down" size={12} />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)} />

          <View style={styles.sheet}>
            <View style={styles.handle} />

            <Text style={styles.modalTitle}>{label}</Text>

            <FlatList
              data={options}
              keyExtractor={item =>
                item.value === null ? 'null' : String(item.value)
              }
              renderItem={({ item }) => {
                const isSelected = item.value === value;

                return (
                  <Pressable
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>

                    <View
                      style={[
                        styles.radio,
                        isSelected && styles.radioSelected,
                      ]}
                    >
                      {isSelected ? <View style={styles.radioDot} /> : null}
                    </View>
                  </Pressable>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            <Pressable
              style={styles.cancelButton}
              onPress={() => setIsOpen(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}