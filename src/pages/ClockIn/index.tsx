import {
  Box,
  Text,
  View,
  Button,
  Input,
  VStack,
  HStack,
  Modal,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, TouchableOpacity } from 'react-native';

const MEMO_STORAGE_KEY = '@daily_memo';

const ClockIn = () => {
  const [memo, setMemo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tempMemo, setTempMemo] = useState('');
  const [studyClockIn, setStudyClockIn] = useState(false);
  const [reviewClockIn, setReviewClockIn] = useState(false);

  useEffect(() => {
    loadMemo();
    loadClockInStatus();
  }, []);

  const loadMemo = async () => {
    try {
      const savedMemo = await AsyncStorage.getItem(MEMO_STORAGE_KEY);
      if (savedMemo) {
        setMemo(savedMemo);
      }
    } catch (error) {
      console.error('加载备忘录失败:', error);
    }
  };

  const saveMemo = async (text: string) => {
    try {
      await AsyncStorage.setItem(MEMO_STORAGE_KEY, text);
      setMemo(text);
    } catch (error) {
      console.error('保存备忘录失败:', error);
    }
  };

  const loadClockInStatus = async () => {
    const today = new Date().toDateString();
    try {
      const studyStatus = await AsyncStorage.getItem(`@study_${today}`);
      const reviewStatus = await AsyncStorage.getItem(`@review_${today}`);
      setStudyClockIn(!!studyStatus);
      setReviewClockIn(!!reviewStatus);
    } catch (error) {
      console.error('加载打卡状态失败:', error);
    }
  };

  const handleClockIn = async (type: 'study' | 'review') => {
    const today = new Date().toDateString();
    try {
      await AsyncStorage.setItem(`@${type}_${today}`, 'done');
      if (type === 'study') {
        setStudyClockIn(true);
      } else {
        setReviewClockIn(true);
      }
    } catch (error) {
      console.error('打卡失败:', error);
    }
  };

  const handleOpenModal = () => {
    setTempMemo(memo);
    setShowModal(true);
  };

  const handleSaveMemo = async () => {
    await saveMemo(tempMemo);
    setShowModal(false);
  };

  const ClockInCard = ({ title, description, isClockIn, onPress }: any) => (
    <TouchableOpacity onPress={onPress} disabled={isClockIn}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientCard}>
        <VStack space={2}>
          <Text color="white" fontSize="xl" bold>
            {title}
          </Text>
          <Text color="white">{description}</Text>
          <Button
            isDisabled={isClockIn}
            bg={isClockIn ? 'gray.400' : 'emerald.500'}
            mt={2}>
            {isClockIn ? '已打卡' : '打卡'}
          </Button>
        </VStack>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View flex={1} bg="white" p={4}>
      <VStack space={4}>
        <HStack space={4}>
          <Box flex={1}>
            <ClockInCard
              title="错题复盘"
              description="每日错题回顾与总结"
              isClockIn={reviewClockIn}
              onPress={() => handleClockIn('review')}
            />
          </Box>
          <Box flex={1}>
            <ClockInCard
              title="每日自习"
              description="坚持每日学习计划"
              isClockIn={studyClockIn}
              onPress={() => handleClockIn('study')}
            />
          </Box>
        </HStack>

        <LinearGradient
          colors={['#FF9966', '#FF5E62']}
          style={styles.gradientMemo}>
          <VStack space={3}>
            <Text color="white" fontSize="xl" bold>
              今日备忘录
            </Text>
            <TouchableOpacity onPress={handleOpenModal}>
              <Text color="white">{memo || '点击添加今日备忘...'}</Text>
            </TouchableOpacity>
          </VStack>
        </LinearGradient>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>编辑备忘录</Modal.Header>
            <Modal.Body>
              <Input
                value={tempMemo}
                onChangeText={setTempMemo}
                placeholder="请输入备忘内容"
                multiline
                numberOfLines={4}
                h={20}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" onPress={() => setShowModal(false)}>
                  取消
                </Button>
                <Button onPress={handleSaveMemo}>保存</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientCard: {
    padding: 16,
    borderRadius: 10,
    minHeight: 150,
  },
  gradientMemo: {
    padding: 16,
    borderRadius: 10,
    minHeight: 120,
  },
});

export default ClockIn;
