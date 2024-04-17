import { memo } from 'react';
import { Text, Box, View, Avatar, Button, Image } from 'native-base';
import { InfoLine } from '../../components/InfoLine';
import { useAppState } from '../../hooks/useAppState';
import { ScrollView } from 'react-native-gesture-handler';
import NoticeCard from './component/NoticeCard';

export default memo(() => {
  const { state } = useAppState();
  return (
    <ScrollView>
      <NoticeCard name="篮球社" desc="篮球" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
      <NoticeCard name="街舞社" desc="这就是街舞！" />
    </ScrollView>
  );
});
