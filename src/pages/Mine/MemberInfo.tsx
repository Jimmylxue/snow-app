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
  Select,
  CheckIcon,
  Toast,
} from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { SafeAreaView } from 'react-native';
import { ESex, useUpdateUser } from '../../service';

export default memo(() => {
  const { state, signOut, updateUserInfo } = useAppState();
  const [username, setUserName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [sex, setSex] = useState<ESex>(ESex.未知);

  const { mutateAsync } = useUpdateUser({
    onSuccess: async () => {
      const newUserInfo = { ...state.userInfo, username, phone, sex };
      // @ts-ignore
      await updateUserInfo?.(newUserInfo);
      Toast.show({
        title: '设置成功',
      });
    },
  });

  useEffect(() => {
    setUserName(state.userInfo?.username || '');
    setPhone(state.userInfo?.phone || '');
    setSex(state.userInfo?.sex || ESex.未知);
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
            <Input
              value={username}
              onChangeText={value => {
                setUserName(value);
              }}
            />
            <FormControl.HelperText>你的姓名</FormControl.HelperText>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>手机号</FormControl.Label>
            <Input
              value={phone}
              onChangeText={value => {
                setPhone(value);
              }}
            />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>性别</FormControl.Label>
            <Select
              selectedValue={sex as any}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setSex(itemValue as any)}>
              <Select.Item label="男" value="1" />
              <Select.Item label="女" value="2" />
            </Select>
          </FormControl>
          <Divider />
          <Button
            mt={5}
            onPress={async () => {
              await mutateAsync({
                username,
                phone,
                sex: Number(sex),
              });
            }}>
            保存信息
          </Button>
        </Box>
      </Stack>
    </SafeAreaView>
  );
});
