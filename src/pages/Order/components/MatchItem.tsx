import { Text, View } from 'native-base';
import { TMatchOrderItem } from '../../../service/car';

type TProps = {
  orderInfo: TMatchOrderItem;
  onMatch?: () => void;
};

export function MatchOrderItem({ orderInfo, onMatch }: TProps) {
  return (
    <View bg="#fff" px={2} py={2} mb={2}>
      <View flexDirection="row" justifyContent="space-between">
        <Text>订单号Id：</Text>
        <Text>{orderInfo.orderId}</Text>
      </View>
      <View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>托运人：</Text>
          <Text>{orderInfo.consumerUsername}</Text>
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>承运人：</Text>
          <Text>{orderInfo.driverUsername}</Text>
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>本单花费：</Text>
          <Text>{orderInfo.money}</Text>
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>匹配状态：</Text>
          <Text>
            {Number(orderInfo.orderStatus) === 1 ? '匹配成功' : '还未匹配'}
          </Text>
        </View>
      </View>
    </View>
  );
}
