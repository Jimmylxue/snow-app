import React, { FC } from 'react';
import { Box, Text } from 'native-base';

interface TProps {
  item: {
    name: string;
    itemType: 'button' | 'prize';
  };
  prizeIndex: number;
  index: number;
  onTouch: () => void;
}

export const PrizeItem: FC<TProps> = ({ prizeIndex, item, index, onTouch }) => {
  const isDrawBtn = item.name === '立即抽奖' && item.itemType === 'button';
  return (
    <Box
      w="32%"
      h="32%"
      backgroundColor="#e9e8fc"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      mt={2}
      borderRadius="lg"
      background={
        prizeIndex === index ? '#e9e97a' : isDrawBtn ? '#f5da54' : '#f5f7d0'
      }
      onTouchStart={() => {
        if (isDrawBtn) {
          onTouch?.();
        }
      }}>
      <Text fontWeight="bold" color={isDrawBtn ? '#e65333' : '#d49457'}>
        {item.name}
      </Text>
    </Box>
  );
};
