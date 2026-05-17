import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

import { styles } from './styles';

type ActionButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
};

export function ActionButton({
  title,
  variant = 'primary',
  disabled,
  ...props
}: ActionButtonProps) {
  const hasDarkTitle = variant === 'secondary' || variant === 'outline';

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.title, hasDarkTitle && styles.darkTitle]}>
        {title}
      </Text>
    </Pressable>
  );
}