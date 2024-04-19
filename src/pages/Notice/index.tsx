import { memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import NoticeCard from './component/NoticeCard';
import {
  EReadStatus,
  useReadLetter,
  useUserLetter,
} from '../../service/letter';
import { navigates } from '../../navigation/navigate';

export default memo(() => {
  const { data, refetch } = useUserLetter(['userLetter'], { platform: 1 });

  const { mutateAsync } = useReadLetter({
    onSuccess() {
      refetch();
    },
  });

  return (
    <ScrollView>
      {data?.map((item, index) => (
        <NoticeCard
          key={index}
          info={item}
          onSeeDetail={async () => {
            await mutateAsync({
              recordId: item.recordId,
              status: EReadStatus.已读,
            });
            navigates('NoticeDetail', {
              letter: item,
            });
          }}
        />
      ))}
    </ScrollView>
  );
});
