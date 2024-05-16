import { memo, useRef, useState } from 'react';
import { RefreshControl, SafeAreaView } from 'react-native';
import { FlatList } from 'native-base';
import { TBaseOrder, useOrderList } from '../../service/car';
import { OrderItem } from './components/OrderItem';
import { adaptive } from '../../utils';
import { MatchModal } from './components/MatchModal';

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

  const [open, setOpen] = useState<boolean>(false);
  const chooseOrder = useRef<TBaseOrder>();

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
        h="full"
        style={{
          paddingTop: adaptive(250),
        }}
        data={orderList}
        keyExtractor={(_, index) => String(index)}
        numColumns={1}
        renderItem={({ item }) => (
          <OrderItem
            orderInfo={item}
            onMatch={() => {
              chooseOrder.current = item;
              setOpen(true);
            }}
          />
        )}
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
      <MatchModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        orderId={chooseOrder.current?.id}
      />
    </SafeAreaView>
  );
});
