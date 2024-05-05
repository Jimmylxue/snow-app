import { memo } from 'react';
import {
  Box,
  Stack,
  FormControl,
  Input,
  Divider,
  Button,
  View,
  Text,
} from 'native-base';
import { SafeAreaView } from 'react-native';

export default memo(() => {
  return (
    <SafeAreaView>
      <View px={2} mt={2}>
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          <Text>车牌号</Text>
          <Text>12345</Text>
        </View>
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          <Text>车辆信息</Text>
          <Text>12345</Text>
        </View>
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          <Text>车辆载重/体积量</Text>
          <Text>12345</Text>
        </View>
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          <Text>车辆特性</Text>
          <Text>12345</Text>
        </View>
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          <Text>车辆位置</Text>
          <Text>12345</Text>
        </View>
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
              <FormControl.Label>车牌号</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆信息</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆载重</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆特性</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆位置</FormControl.Label>
              <Input />
            </FormControl>
            <Divider />
            <Button mt={5}>保存信息</Button>
          </Box>
        </Stack>
      </View>
    </SafeAreaView>
  );
});
