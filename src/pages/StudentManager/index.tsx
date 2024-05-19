import { memo } from 'react';
import { Text, Box, View, Avatar, Button } from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { SafeAreaView } from 'react-native';
import { ERoleType } from '../../service';
import { useLocation } from '../../hooks/useLocation';
import { Student } from './View/Student';
import { Parent } from './View/Parent';
import { useSleepTime } from '../../service/studentManager';
import { useSleepInfo } from './core';

export default memo(() => {
  const { state, signOut } = useAppState();
  const { data } = useSleepInfo();
  const isManager = state.userInfo?.role === ERoleType.管理员;

  return (
    <SafeAreaView>
      <Box h="full" w="full" px={2}>
        <View my={3}>
          <Text fontSize="md">你好~ {state.userInfo?.username}</Text>
        </View>
        <View>
          <Text>
            您设置的爱眼时间为：
            <Text fontWeight="semibold">
              {data?.disabledStartHour}点至{data?.disabledEndHour}点
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight={300} my={2}>
            孩子在端这个时间段将不能访问家庭圈
          </Text>
        </View>
        {isManager ? <Parent sleepInfo={data!} /> : <Student />}
      </Box>
    </SafeAreaView>
  );
});
