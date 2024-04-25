import { memo, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { navigates } from '../../navigation/navigate';
import { useSms } from '../../utils/sms';
import MessageCard from './component/MessageCard';
import { useSmsList } from '../../service/useSms';
import { RefreshControl } from 'react-native';
import { TSmsItem } from '../../navigation/navigation';

export default memo(() => {
  const { smsList } = useSms();
  const { data, isFetching, refetch } = useSmsList(['smsList'], {}, {});

  const [pageData, setPageData] = useState<TSmsItem[]>([]);

  useEffect(() => {
    const mockData = (data || []).map(it => ({ body: it, address: '123456' }));
    setPageData([...smsList, ...mockData]);
  }, [smsList, data]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }>
      {pageData?.map((item, index) => (
        <MessageCard
          key={index}
          info={item}
          onSeeDetail={async () => {
            navigates('SmsDetail', {
              message: item,
            });
          }}
        />
      ))}
    </ScrollView>
  );
});
