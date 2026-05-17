import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from './styles';

type FormInputProps = TextInputProps & {
  label: string;
  leftIcon?: string;
};

export function FormInput({
  label,
  leftIcon,
  multiline,
  style,
  ...props
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          multiline && styles.inputWrapperMultiline,
        ]}
      >
        {leftIcon ? (
          <Text style={[styles.icon, multiline && styles.iconMultiline]}>
            {leftIcon}
          </Text>
        ) : null}

        <TextInput
          style={[styles.input, multiline && styles.inputMultiline, style]}
          multiline={multiline}
          placeholderTextColor="#9aa1ac"
          textAlignVertical={multiline ? 'top' : 'center'}
          {...props}
        />
      </View>
    </View>
  );
}