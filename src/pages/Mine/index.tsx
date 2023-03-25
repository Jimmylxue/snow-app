import { memo } from 'react';
import { View, Text, Button, Box } from 'native-base';

export default memo(() => {
  return (
    <Box h="full" w="full" backgroundColor="#7171f6">
      <Text>我的页面</Text>
    </Box>
  );
});
