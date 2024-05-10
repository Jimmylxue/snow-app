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
import { useUserChangePassword } from '../../service';

export default memo(() => {
  const { state, signOut } = useAppState();
  const { mutateAsync } = useUserChangePassword();
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
          <Button mt={5} mb={3}>
            保存信息
          </Button>
          <FormControl mb="5">
            <FormControl.Label>密码</FormControl.Label>
            <Input />
            <FormControl.HelperText>
              告诉我们你的收货地址
            </FormControl.HelperText>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>新密码</FormControl.Label>
            <Input />
            <FormControl.HelperText>
              告诉我们你的收货地址
            </FormControl.HelperText>
          </FormControl>
          <Button
            mt={5}
            onPress={async () => {
              await mutateAsync({
                password: '2222',
              });
            }}>
            修改密码
          </Button>
        </Box>
      </Stack>
    </SafeAreaView>
  );
});
