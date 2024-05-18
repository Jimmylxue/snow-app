import { memo } from 'react';
import {
  Text,
  Box,
  Stack,
  FormControl,
  Input,
  Divider,
  WarningOutlineIcon,
  Button,
} from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { SafeAreaView } from 'react-native';

export default memo(() => {
  const { state, signOut } = useAppState();
  return (
    <SafeAreaView>
      <Stack
        bg="#FFF"
        h="full"
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        pt={4}
        w={{
          base: '100%',
          md: '25%',
        }}>
        <Box>
          <FormControl mb="5">
            <FormControl.Label>用户名</FormControl.Label>
            <Input />
            <FormControl.HelperText>你的姓名</FormControl.HelperText>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>手机号</FormControl.Label>
            <Input />
            <FormControl.HelperText>你的联系方式</FormControl.HelperText>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>收货地址</FormControl.Label>
            <Input />
            <FormControl.HelperText>
              告诉我们你的收货地址
            </FormControl.HelperText>
          </FormControl>
          <Divider />
          <Button mt={5}>保存信息</Button>
        </Box>
      </Stack>
    </SafeAreaView>
  );
});
