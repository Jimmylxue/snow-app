import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Text, View } from 'native-base';
import {
  EStudyRoomType,
  useExitStudyRoom,
  useStudyRoomDetail,
  useStudyRoomOnline,
} from '../../service/study';

type StudyRoomParams = {
  studyRoomId: number;
};

const StudyRoom = () => {
  const [studyTime, setStudyTime] = useState(0); // 以秒为单位
  const [isTimerRunning, setIsTimerRunning] = useState(true); // 添加计时器状态控制
  const navigation = useNavigation();
  const { mutate: exitStudyRoom } = useExitStudyRoom();
  const route = useRoute<RouteProp<Record<string, StudyRoomParams>, string>>();
  const { studyRoomId } = route.params;
  const { data: studyRoomDetail } = useStudyRoomDetail(
    ['studyRoomDetail', studyRoomId],
    { studyRoomId },
  );

  const { data: studyRoomOnline } = useStudyRoomOnline(
    ['studyRoomOnline', studyRoomId],
    { studyRoomId },
    {
      refetchInterval: 1000 * 5,
    },
  );

  // 修改计时器效果
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 先定义 handleExitConfirmation
  const handleExitConfirmation = useCallback(() => {
    Alert.alert(
      '确认退出',
      '确定要退出自习室吗？',
      [
        {
          text: '取消',
          onPress: () => setIsTimerRunning(true),
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: async () => {
            setIsTimerRunning(false);
            await exitStudyRoom({ studyRoomId });
            navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
    return true;
  }, [exitStudyRoom, studyRoomId, navigation]);

  // 然后定义 handleExit
  const handleExit = useCallback(() => {
    setIsTimerRunning(false);
    if (studyTime < 120) {
      Alert.alert('提示', '不足两分钟不计入时长', [
        {
          text: '继续学习',
          onPress: () => setIsTimerRunning(true),
          style: 'cancel',
        },
        {
          text: '确认退出',
          onPress: () => {
            setIsTimerRunning(false);
            navigation.goBack();
          },
        },
      ]);
      return true;
    }
    return handleExitConfirmation();
  }, [studyTime, navigation, handleExitConfirmation]);

  // 添加返回按钮监听
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleExit,
      );

      return () => subscription.remove();
    }, [handleExit]),
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleExit}>
          <Text ml={2}>退出</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleExit]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#F5F5F5']} style={styles.background}>
        <View justifyContent="center" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">
            {studyRoomDetail?.studyRoomType === EStudyRoomType.自由自习室
              ? '自由自习室'
              : '统一自习室'}
          </Text>
        </View>

        <View justifyContent="center" alignItems="center" mt={4}>
          <Text fontSize="sm">已学习时间</Text>
          <Text fontSize="4xl" fontWeight="bold" color="#1565C0">
            {formatTime(studyTime)}
          </Text>
        </View>

        {studyRoomDetail?.studyRoomType === EStudyRoomType.统一自习室 &&
          studyRoomDetail?.closeTime && (
            <View style={styles.endTimeContainer}>
              <Text style={styles.endTimeLabel}>自习室开放至</Text>
              <Text style={styles.endTimeText}>
                {studyRoomDetail.closeTime}
              </Text>
              <Text style={styles.endTimeHint}>请在结束时间之前退出自习室</Text>
            </View>
          )}

        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>退出自习</Text>
        </TouchableOpacity>

        <View justifyContent="center" w="100%" alignItems="center" mt={4}>
          <Text fontWeight="semibold" alignItems="center">
            当前在线人数：
            <Text color="#1565C0" fontSize="lg" fontWeight="bold">
              {studyRoomOnline || 0}
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  scrollContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#1565C0',
    marginTop: 8,
    fontWeight: '500',
  },
  enterButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  timerLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  endTimeContainer: {
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgba(21, 101, 192, 0.1)',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  endTimeLabel: {
    fontSize: 16,
    color: '#666',
  },
  endTimeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1565C0',
    marginTop: 8,
  },
  endTimeHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  exitButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 2,
  },
  exitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default StudyRoom;
