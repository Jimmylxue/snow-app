import { memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { navigates } from '../../navigation/navigate';
import { useSms } from '../../utils/sms';
import MessageCard from './component/MessageCard';

export default memo(() => {
  const { smsList } = useSms();

  return (
    <ScrollView>
      {smsList?.map((item, index) => (
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
