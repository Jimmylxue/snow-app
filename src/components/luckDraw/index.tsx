import { memo } from 'react';
import { Box } from 'native-base';
import { TLuckDrawInterface } from './core/types';
import useDrawLayout from './core/useDrawLayout';

export default memo<TLuckDrawInterface>(({ prizeList, drawType }) => {
  const { node } = useDrawLayout({
    prizeList,
    chartType: drawType,
  });

  return (
    <Box
      borderColor="#9dc452"
      backgroundColor="#2e6436"
      borderWidth="5"
      borderRadius="lg"
      px={2}>
      {node}
    </Box>
  );
});
