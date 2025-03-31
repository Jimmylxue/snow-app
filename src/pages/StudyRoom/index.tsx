import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type StudyRoomParams = {
  type: 'free' | 'unified';
  endTime?: string; // 统一自习室的结束时间
};

const StudyRoom = () => {
  const [studyTime, setStudyTime] = useState(0); // 以秒为单位
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, StudyRoomParams>, string>>();
  // const { type, endTime } = route.params;
  const type = 'free';
  const endTime = '2025-03-30 18:00:00';

  // 计时器效果
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 退出自习室
  const handleExit = () => {
    Alert.alert(
      '确认退出',
      '确定要退出自习室吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#F5F5F5']} style={styles.background}>
        <Text style={styles.header}>
          {type === 'free' ? '自由自习室' : '统一自习室'}
        </Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>已学习时间</Text>
          <Text style={styles.timerText}>{formatTime(studyTime)}</Text>
        </View>

        {type === 'unified' && endTime && (
          <View style={styles.endTimeContainer}>
            <Text style={styles.endTimeLabel}>自习室开放至</Text>
            <Text style={styles.endTimeText}>{endTime}</Text>
            <Text style={styles.endTimeHint}>请在结束时间之前退出自习室</Text>
          </View>
        )}

        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>退出自习</Text>
        </TouchableOpacity>
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
