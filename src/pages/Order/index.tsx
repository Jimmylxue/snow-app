import { memo } from 'react';
import { Text, Stack, View, ScrollView } from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useOrderList } from '../../service/car';
import { navigates } from '../../navigation/navigate';
import { OrderItem } from './components/OrderItem';
import { adaptive } from '../../utils';

export default memo(() => {
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useOrderList(
      ['orderList'],
      {
        current: 1,
        size: 5,
      },
      {},
    );

  const orderList = data?.pages.reduce((arr, page) => {
    if (page) {
      // @ts-ignore
      return arr.concat(page.records || []);
    }
    return arr;
  }, []);

  console.log('orderList~', orderList);

  return (
    <SafeAreaView>
      <FlatList
        style={{
          paddingTop: adaptive(250),
        }}
        data={orderList}
        keyExtractor={(_, index) => String(index)}
        numColumns={1}
        renderItem={({ item }) => <OrderItem orderInfo={item} />}
        onEndReached={() => {
          console.log('触底了', { hasNextPage, isFetching });
          if (!isFetching && hasNextPage) {
            console.log('ftechl ');
            fetchNextPage();
          }
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
});
