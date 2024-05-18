import { Box, Button, Input } from 'native-base';
import { FC, useEffect, useState } from 'react';
import { TPrizeList } from '../../../components/luckDraw/core/types';
import { Mask } from '../../../components/Mask';

interface TProps {
  show: boolean;
  title: string;
  prizeList: TPrizeList;
  onClose: () => void;
  onConfirm: (newPrizeList: TPrizeList) => void;
}

export const SettingPrize: FC<TProps> = ({
  show,
  title,
  onClose,
  onConfirm,
  prizeList,
}) => {
  const [list, setPrizeList] = useState<TPrizeList>([]);

  useEffect(() => {
    setPrizeList(prizeList);
  }, [prizeList]);

  return (
    <>
      <Mask height={2500} title={title} visible={show} onClose={onClose}>
        <Box px={4}>
          {list.map((prize, index) => (
            <Input
              size="sm"
              mt={3}
              key={index}
              placeholder="xs Input"
              value={prize.name}
              onChangeText={value => {
                const newPrize = [...prizeList];
                newPrize[index].name = value;
                setPrizeList(newPrize);
              }}
            />
          ))}
          <Button
            mt={3}
            onPress={() => {
              onConfirm(prizeList);
              onClose();
            }}>
            确认修改
          </Button>
        </Box>
      </Mask>
    </>
  );
};
