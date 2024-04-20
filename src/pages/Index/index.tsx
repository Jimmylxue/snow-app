import { memo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Button, Text } from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { navigates } from '../../navigation/navigate';

export default memo(() => {
  const { state, signOut } = useAppState();

  const [jia, setJia] = useState<string>('');
  const [yi, setYi] = useState<string>('');
  const [bing, setBing] = useState<string>('');
  const [all, setAll] = useState<string>('');

  return (
    <SafeAreaView>
      <View
        w="full"
        h="full"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#3498db"
        position="relative">
        <View position="absolute" right={2} top={4} flexDir="row">
          <Text>您好，{state.userInfo?.phone}</Text>
          <Text
            color="#fff"
            ml="2"
            onPress={() => {
              signOut?.();
            }}>
            登出
          </Text>
        </View>
        <Text color="#fff" fontSize="2xl">
          可燃气体浓度检查
        </Text>
        <Button
          w="2/3"
          mt="8"
          shadow={2}
          onPress={() => {
            navigates('Main', undefined);
          }}>
          进入检测
        </Button>
      </View>
    </SafeAreaView>
  );
});
