import { memo } from 'react';
import { SafeAreaView } from 'react-native';
import { Input, View, Button, Toast, Text } from 'native-base';
import { useAppState } from '../../hooks/useAppState';

export default memo(() => {
  const { state, signOut } = useAppState();
  return (
    <SafeAreaView>
      <View
        w="full"
        h="full"
        justifyContent="center"
        alignItems="center"
        position="relative">
        <View position="absolute" right={2} top={2} flexDir="row">
          <Text>您好，{state.userInfo?.phone}</Text>
          <Text
            color="#418faf"
            ml="2"
            onPress={() => {
              signOut?.();
            }}>
            登出
          </Text>
        </View>
        <Input
          w="2/3"
          shadow={2}
          _light={{
            bg: 'coolGray.100',
            _hover: {
              bg: 'coolGray.200',
            },
            _focus: {
              bg: 'coolGray.200:alpha.70',
            },
          }}
          _dark={{
            bg: 'coolGray.800',
            _hover: {
              bg: 'coolGray.900',
            },
            _focus: {
              bg: 'coolGray.900:alpha.70',
            },
          }}
          placeholder="Enter your name"
          value="浓度"
          isReadOnly
        />
        <Input
          mt={4}
          w="2/3"
          shadow={2}
          _light={{
            bg: 'coolGray.100',
            _hover: {
              bg: 'coolGray.200',
            },
            _focus: {
              bg: 'coolGray.200:alpha.70',
            },
          }}
          _dark={{
            bg: 'coolGray.800',
            _hover: {
              bg: 'coolGray.900',
            },
            _focus: {
              bg: 'coolGray.900:alpha.70',
            },
          }}
          placeholder="请输入浓度"
        />
        <Button
          w="2/3"
          mt="4"
          shadow={2}
          onPress={() => {
            Toast.show({ title: '浓度已超标' });
          }}>
          检测
        </Button>
      </View>
    </SafeAreaView>
  );
});
