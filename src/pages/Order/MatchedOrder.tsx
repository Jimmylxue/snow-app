import { memo } from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'native-base';
import { useMatchOrderList } from '../../service/car';
import { MatchOrderItem } from './components/MatchItem';

export default memo(() => {
  const { data } = useMatchOrderList(['matchedOrderList'], {}, {});

  return (
    <SafeAreaView>
      <FlatList
        h="full"
        data={data}
        keyExtractor={(_, index) => String(index)}
        numColumns={1}
        renderItem={({ item }) => <MatchOrderItem orderInfo={item} />}
      />
    </SafeAreaView>
  );
});
