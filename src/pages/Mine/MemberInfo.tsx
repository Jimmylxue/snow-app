import { memo, useState } from 'react';
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
import { useUserChangePassword } from '../../service';

export default memo(() => {
  const { state, signOut } = useAppState();
  const { mutateAsync } = useUserChangePassword();
  const [password, setPassword] = useState<string>('');
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
            <FormControl.Label>新密码</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={val => setPassword(val)}
            />
            <FormControl.HelperText>请输入您的新密码</FormControl.HelperText>
          </FormControl>
          <Button
            mt={5}
            onPress={async () => {
              if (!password) {
                Toast.show({ title: '请输入新密码' });
                return;
              }
              await mutateAsync(password);
              Toast.show({ title: '修改成功' });
            }}>
            修改密码
          </Button>
        </Box>
      </Stack>
    </SafeAreaView>
  );
});
