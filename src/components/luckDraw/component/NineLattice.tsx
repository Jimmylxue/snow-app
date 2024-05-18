import { memo } from 'react';
import { Box } from 'native-base';
import { TShowList } from '../core/types';
import { useLuckDraw } from '../core/draw';
import { PrizeItem } from './PrizeItem';

type TProps = {
  prizeLayoutList: TShowList;
};

export default memo(({ prizeLayoutList }: TProps) => {
  const { prizeIndex, draw, isDrawing } = useLuckDraw();

  return (
    <Box
      flexDirection="row"
      flexWrap="wrap"
      h="100%"
      justifyContent="space-between"
      alignItems="flex-end"
      pb={6}>
      {prizeLayoutList.map((item, index) => (
        <PrizeItem
          item={item}
          key={index}
          index={index}
          prizeIndex={prizeIndex}
          onTouch={() => {
            if (item.itemType === 'button') {
              if (!isDrawing) {
                const index = Math.floor(Math.random() * 8) + 1;
                draw(index);
              } else {
              }
            }
          }}
        />
      ))}
    </Box>
  );
});
