import React, { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ChevronIcon } from '../ChevronIcon';
import { styles } from './styles';

type CollapsibleSectionProps = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export function CollapsibleSection({
  title,
  expanded,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={onToggle}>
        <Text style={styles.title}>{title}</Text>

          <ChevronIcon direction={expanded ? 'up' : 'down'} size={12} />

      </Pressable>

      {expanded ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}