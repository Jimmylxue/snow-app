import { TouchableOpacity } from 'react-native';
import { navigates } from '../../../navigation/navigate';
import { Button, Text, View } from 'native-base';
import { TBaseOrder } from '../../../service/car';

type TProps = {
  orderInfo: TBaseOrder;
  onMatch: () => void;
};

export function OrderItem({ orderInfo, onMatch }: TProps) {
  return (
    // <TouchableOpacity
    //   onPress={() => {
    //     navigates('OrderDetail', { orderId: 1 });
    //   }}>
    <View bg="#fff" px={2} py={2} mb={2}>
      <View flexDirection="row" justifyContent="space-between">
        <Text>订单号Id：</Text>
        <Text>{orderInfo.id}</Text>
      </View>
      <View>
        {/* <View flexDirection="row" justifyContent="space-between">
            <Text>托运人</Text>
            <Text>吉米</Text>
          </View>
          <View flexDirection="row" justifyContent="space-between">
            <Text>承运人</Text>
            <Text>吉米2</Text>
          </View> */}
        <View flexDirection="row" justifyContent="space-between">
          <Text>联系方式：</Text>
          <Text>{orderInfo.phone}</Text>
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>收货地址：</Text>
          <Text>{orderInfo.addr}</Text>
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>当前物流：</Text>
          <Text>{orderInfo.logisticsInformation}</Text>
        </View>
      </View>
      <Button onPress={onMatch}>匹配</Button>
    </View>
    // </TouchableOpacity>
  );
}
