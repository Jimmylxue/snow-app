import { Button, Text, View } from 'native-base';
import { TBaseOrder } from '../../../service/car';

type TProps = {
  orderInfo: TBaseOrder;
  onMatch?: () => void;
};

export function OrderItem({ orderInfo, onMatch }: TProps) {
  return (
    <View bg="#fff" px={2} py={2} mb={2}>
      <View flexDirection="row" justifyContent="space-between">
        <Text>订单号Id：</Text>
        <Text>{orderInfo.orderId}</Text>
      </View>
      <View>
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
        <View flexDirection="row" justifyContent="space-between">
          <Text>匹配状态：</Text>
          <Text>
            {Number(orderInfo.orderStatus) === 1 ? '匹配成功' : '还未匹配'}
          </Text>
        </View>
      </View>
      {Number(orderInfo.orderStatus) !== 1 && (
        <Button mt={2} onPress={onMatch}>
          匹配
        </Button>
      )}
    </View>
  );
}