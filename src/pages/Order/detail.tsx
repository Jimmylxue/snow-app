import { memo, useState } from 'react';
import {
  Box,
  FormControl,
  Input,
  Button,
  Select,
  CheckIcon,
  Toast,
  ScrollView,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { useOrderDetail, useSubmitOrder } from '../../service/car';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';

type RouterParams = RouteProp<RootStackParamList, 'OrderDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();

  const {} = useOrderDetail(
    ['orderDetail'],
    {
      orderId: params.orderId,
    },
    {
      enabled: !!params.orderId,
    },
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Box px={2} py={2}>
          订单详情
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
});
