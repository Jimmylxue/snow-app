import { memo } from 'react';
import { Text, Stack, View, ScrollView } from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useOrderList } from '../../service/car';
import { navigates } from '../../navigation/navigate';

export default memo(() => {
  const { data } = useOrderList(
    ['orderList'],
    {
      current: 1,
      size: 1,
    },
    {},
  );

  console.log('data~', data);

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
          <TouchableOpacity
            onPress={() => {
              navigates('OrderDetail', { orderId: 1 });
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
          </TouchableOpacity>
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
