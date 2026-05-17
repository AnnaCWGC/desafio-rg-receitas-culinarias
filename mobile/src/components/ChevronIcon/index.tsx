import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

type ChevronDirection = 'up' | 'down' | 'left' | 'right';

type ChevronIconProps = {
  direction?: ChevronDirection;
  size?: number;
  color?: string;
};

const rotationByDirection: Record<ChevronDirection, string> = {
  down: '45deg',
  right: '-45deg',
  up: '-135deg',
  left: '135deg',
};

export function ChevronIcon({
  direction = 'down',
  size = 14,
  color = '#6b7280',
}: ChevronIconProps) {
  return (
    <View
      style={[
        styles.chevron,
        {
          width: size,
          height: size,
          borderColor: color,
          transform: [
            {
              rotate: rotationByDirection[direction],
            },
          ],
        },
      ]}
    />
  );
}