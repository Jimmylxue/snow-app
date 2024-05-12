import { memo, useEffect, useState } from 'react';
import {
  Text,
  Box,
  Stack,
  FormControl,
  Input,
  Divider,
  WarningOutlineIcon,
  Button,
  Toast,
} from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { SafeAreaView } from 'react-native';
import { useUpdateUser, useUserDetail } from '../../service';

export default memo(() => {
  const { state, updateUser } = useAppState();
  const [username, setUserName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const { mutateAsync: getUser } = useUserDetail({
    onSuccess: data => {
      updateUser?.(data);
    },
  });

  const { mutateAsync } = useUpdateUser({
    onSuccess: async () => {
      Toast.show({ title: '更新成功' });
      await getUser({});
    },
  });

  useEffect(() => {
    if (state.userInfo) {
      setUserName(state.userInfo.username);
      setPhone(state.userInfo.phone || '');
    }
  }, [state.userInfo]);

  return (
    <SafeAreaView>
      <Stack
        bg="#FFF"
        h="full"
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        w={{
          base: '100%',
          md: '25%',
        }}>
        <Box>
          <FormControl mb="5">
            <FormControl.Label>用户名</FormControl.Label>
            <Input value={username} onChangeText={val => setUserName(val)} />
            <FormControl.HelperText>你的姓名</FormControl.HelperText>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>手机号</FormControl.Label>
            <Input value={phone} onChangeText={val => setPhone(val)} />
            <FormControl.HelperText>你的联系方式</FormControl.HelperText>
          </FormControl>
          <Divider />
          <Button
            mt={5}
            onPress={() => {
              // @ts-ignore
              mutateAsync({
                // @ts-ignore
                username,
                // @ts-ignore
                phone: String(phone),
                // @ts-ignore
                id: state.userInfo?.id!,
              });
            }}>
            保存信息
          </Button>
        </Box>
      </Stack>
    </SafeAreaView>
  );
});
