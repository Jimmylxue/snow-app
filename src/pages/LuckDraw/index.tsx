import { memo, useState } from 'react';
import { Button, Box } from 'native-base';
import { adaptive } from '../../utils/adaptive';
import LuckDraw from '../../components/luckDraw';
import { SettingPrize } from './components/SettingPrize';
import { usePrizeList } from './core/usePrizeLIst';

const Container = () => {
  const { prizeList, changePrizeList } = usePrizeList();
  const [settingVisible, setSettingVisible] = useState<boolean>(false);

  return (
    <Box
      w="full"
      h="full"
      backgroundColor="#7171f6"
      flexDirection="row"
      justifyContent="center"
      pt={10}>
      <Box w={adaptive(1600)} h={adaptive(1600)}>
        {prizeList.length === 8 && (
          <LuckDraw prizeList={prizeList} drawType="NINE_LATTICE" />
        )}
        <Button mt={5} onPress={() => setSettingVisible(true)}>
          设置奖池
        </Button>
        <SettingPrize
          show={settingVisible}
          prizeList={prizeList}
          onClose={() => setSettingVisible(false)}
          title="设置奖池"
          onConfirm={(newPrizeList: { name: string }[]) =>
            changePrizeList([...newPrizeList])
          }
        />
      </Box>
    </Box>
  );
};

export default memo(() => {
  return <Container />;
});
