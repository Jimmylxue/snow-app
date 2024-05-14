import { memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import MessageCard from './component/MessageCard';
import { useBlackList } from '../../service/useSms';
import { navigates } from '../../navigation/navigate';

export default memo(() => {
  const { blackList } = useBlackList();

  return (
    <>
      <ScrollView>
        {blackList?.map((item, index) => (
          <MessageCard
            key={index}
            info={item}
            onSeeDetail={() => {
              navigates('SmsDetail', {
                message: item,
                showAddBlack: false,
              });
            }}
          />
        ))}
      </ScrollView>
    </>
  );
});
