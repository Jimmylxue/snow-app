import { memo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Input, View, Button, Toast, Text } from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { checkOver } from '../../utils/util';

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
        position="relative">
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
          placeholder="请输入甲烷体积"
          value={jia}
          onChangeText={val => {
            setJia(val);
          }}
          keyboardType="numeric"
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
          placeholder="请输入乙烷体积"
          value={yi}
          onChangeText={val => {
            setYi(val);
          }}
          keyboardType="numeric"
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
          placeholder="请输入丙烷体积"
          value={bing}
          onChangeText={val => {
            setBing(val);
          }}
          keyboardType="numeric"
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
          placeholder="请输入总混合气体体积"
          value={all}
          onChangeText={val => setAll(val)}
          keyboardType="numeric"
        />
        <Button
          w="2/3"
          mt="4"
          shadow={2}
          onPress={() => {
            if (!/^-?\d+(\.\d+)?$/.test(jia) || !jia) {
              Toast.show({ title: '请输入正确的数值类型' });
              return;
            }
            if (!/^-?\d+(\.\d+)?$/.test(yi) || !yi) {
              Toast.show({ title: '请输入正确的数值类型' });
              return;
            }
            if (!/^-?\d+(\.\d+)?$/.test(bing) || !bing) {
              Toast.show({ title: '请输入正确的数值类型' });
              return;
            }
            if (!/^-?\d+(\.\d+)?$/.test(all) || !all) {
              Toast.show({ title: '请输入正确的数值类型' });
              return;
            }

            checkOver(+jia, +yi, +bing, +all);
          }}>
          检测
        </Button>
      </View>
    </SafeAreaView>
  );
});
