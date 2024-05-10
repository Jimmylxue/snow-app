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
  View,
  ScrollView,
} from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { SafeAreaView } from 'react-native';

export default memo(() => {
  const { state, signOut } = useAppState();
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack
          h="full"
          space={2}
          alignSelf="center"
          px="2"
          safeArea
          pt={2}
          w={{
            base: '100%',
            md: '25%',
          }}>
          <View bg="#fff" px={2} py={2}>
            <View flexDirection="row" justifyContent="space-between">
              <Text>订单号：2637812392173891273</Text>
              <Text>¥：100</Text>
            </View>
            <View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>托运人</Text>
                <Text>吉米</Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>承运人</Text>
                <Text>吉米2</Text>
              </View>
              <View>
                <Text>货物地址：</Text>
                <Text>福建省福州市闽侯县高新区华建大厦</Text>
              </View>
              <View>
                <Text>托运地址：</Text>
                <Text>福建省福州市闽侯县高新区万福中心</Text>
              </View>
              <View>
                <Text>当前物流：</Text>
                <Text>福建省福州市闽侯县高新区厚庭地铁站</Text>
              </View>
            </View>
          </View>
          <View bg="#fff" px={2} py={2}>
            <View flexDirection="row" justifyContent="space-between">
              <Text>订单号：2637812392173891273</Text>
              <Text>¥：100</Text>
            </View>
            <View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>托运人</Text>
                <Text>吉米</Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>承运人</Text>
                <Text>吉米2</Text>
              </View>
              <View>
                <Text>货物地址：</Text>
                <Text>福建省福州市闽侯县高新区华建大厦</Text>
              </View>
              <View>
                <Text>托运地址：</Text>
                <Text>福建省福州市闽侯县高新区万福中心</Text>
              </View>
              <View>
                <Text>当前物流：</Text>
                <Text>福建省福州市闽侯县高新区厚庭地铁站</Text>
              </View>
            </View>
          </View>
          <View bg="#fff" px={2} py={2}>
            <View flexDirection="row" justifyContent="space-between">
              <Text>订单号：2637812392173891273</Text>
              <Text>¥：100</Text>
            </View>
            <View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>托运人</Text>
                <Text>吉米</Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>承运人</Text>
                <Text>吉米2</Text>
              </View>
              <View>
                <Text>货物地址：</Text>
                <Text>福建省福州市闽侯县高新区华建大厦</Text>
              </View>
              <View>
                <Text>托运地址：</Text>
                <Text>福建省福州市闽侯县高新区万福中心</Text>
              </View>
              <View>
                <Text>当前物流：</Text>
                <Text>福建省福州市闽侯县高新区厚庭地铁站</Text>
              </View>
            </View>
          </View>
          <View bg="#fff" px={2} py={2}>
            <View flexDirection="row" justifyContent="space-between">
              <Text>订单号：2637812392173891273</Text>
              <Text>¥：100</Text>
            </View>
            <View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>托运人</Text>
                <Text>吉米</Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>承运人</Text>
                <Text>吉米2</Text>
              </View>
              <View>
                <Text>货物地址：</Text>
                <Text>福建省福州市闽侯县高新区华建大厦</Text>
              </View>
              <View>
                <Text>托运地址：</Text>
                <Text>福建省福州市闽侯县高新区万福中心</Text>
              </View>
              <View>
                <Text>当前物流：</Text>
                <Text>福建省福州市闽侯县高新区厚庭地铁站</Text>
              </View>
            </View>
          </View>
          <View bg="#fff" px={2} py={2}>
            <View flexDirection="row" justifyContent="space-between">
              <Text>订单号：2637812392173891273</Text>
              <Text>¥：100</Text>
            </View>
            <View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>托运人</Text>
                <Text>吉米</Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>承运人</Text>
                <Text>吉米2</Text>
              </View>
              <View>
                <Text>货物地址：</Text>
                <Text>福建省福州市闽侯县高新区华建大厦</Text>
              </View>
              <View>
                <Text>托运地址：</Text>
                <Text>福建省福州市闽侯县高新区万福中心</Text>
              </View>
              <View>
                <Text>当前物流：</Text>
                <Text>福建省福州市闽侯县高新区厚庭地铁站</Text>
              </View>
            </View>
          </View>
          <View bg="#fff" px={2} py={2}>
            <View flexDirection="row" justifyContent="space-between">
              <Text>订单号：2637812392173891273</Text>
              <Text>¥：100</Text>
            </View>
            <View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>托运人</Text>
                <Text>吉米</Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text>承运人</Text>
                <Text>吉米2</Text>
              </View>
              <View>
                <Text>货物地址：</Text>
                <Text>福建省福州市闽侯县高新区华建大厦</Text>
              </View>
              <View>
                <Text>托运地址：</Text>
                <Text>福建省福州市闽侯县高新区万福中心</Text>
              </View>
              <View>
                <Text>当前物流：</Text>
                <Text>福建省福州市闽侯县高新区厚庭地铁站</Text>
              </View>
            </View>
          </View>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
});
