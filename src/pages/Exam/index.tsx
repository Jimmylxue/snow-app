import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useExamPaperDetail, useFinishExam } from '../../service/study';
import { Input, Toast } from 'native-base';
type ExamParams = {
  subjectId: number;
};

const MAX_TIME = 3 * 60 * 60;

const Exam = () => {
  const route = useRoute<RouteProp<Record<string, ExamParams>, string>>();
  const navigation = useNavigation();
  const subjectId = route.params?.subjectId; // 从路由参数获取科目

  const [score, setScore] = useState<string>('');
  const { data: examPaperDetail } = useExamPaperDetail(
    ['examPaperDetail', subjectId],
    { examProjectId: +subjectId },
  );

  const { mutate: finishExam } = useFinishExam();

  /**
   * 当这个倒计时编程0秒后 展示新的倒计时 表示 超时的时间
   */

  const [timeLeft, setTimeLeft] = useState(4);
  const [isOvertime, setIsOvertime] = useState(false);
  const [overtimeSeconds, setOvertimeSeconds] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState('');
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunning) return;

      if (!isOvertime) {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            setIsOvertime(true);
            return 0;
          }
          return prevTime - 1;
        });
      } else {
        setOvertimeSeconds(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOvertime, isRunning]);

  const formatTime = (seconds: number, overtime: boolean = false) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return overtime ? `超时 ${timeString}` : timeString;
  };

  const handleSubmit = () => {
    setIsRunning(false);
    setModalVisible(true);
  };

  const handleReviewSubmit = async () => {
    const usedTime = MAX_TIME - timeLeft + overtimeSeconds;
    await finishExam({
      examProjectId: +subjectId,
      desc: review,
      useTime: usedTime,
      overTime: overtimeSeconds,
      remainTime: MAX_TIME - usedTime,
      totalScore: +score,
    });
    setModalVisible(false);
    Toast.show({
      title: '提交成功',
      description: '您的考试成绩已提交',
    });
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const handleBack = () => {
    Alert.alert(
      '退出确认',
      '确定要退出考试吗？',
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

  const handleModalClose = () => {
    setIsRunning(true);
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subject}>{examPaperDetail?.projectName}考试</Text>
        <View style={styles.timerContainer}>
          <Text style={[styles.timerText, isOvertime && { color: '#ff6b6b' }]}>
            {isOvertime
              ? formatTime(overtimeSeconds, true)
              : formatTime(timeLeft)}
          </Text>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>交卷</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>考试复盘</Text>
            <Input
              mb={2}
              placeholder="请输入此次考试的成绩..."
              value={score}
              onChangeText={(text: string) => setScore(text)}
              multiline
            />
            <TextInput
              style={styles.reviewInput}
              multiline
              placeholder="请输入您的考试心得..."
              value={review}
              onChangeText={setReview}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleReviewSubmit}>
                <Text style={styles.modalButtonText}>提交</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20, // 减小顶部间距，因为有了header
  },
  subject: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
  },
  timerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#8e8e8e',
  },
  confirmButton: {
    backgroundColor: '#4c669f',
  },
  modalButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Exam;
