import React, { useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  ScrollView,
  View,
  Avatar,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useExamScoreRank, useExamPre100Score } from '../../service/study';

type ExamRankParams = {
  subjectId: number;
};

interface RankItemProps {
  rank: number;
  item: any;
}

const RankItem: React.FC<RankItemProps> = ({ rank, item }) => {
  const getMedalColor = (position: number): string[] => {
    switch (position) {
      case 1:
        return ['#FFD700', '#FFA500']; // 金牌
      case 2:
        return ['#C0C0C0', '#A9A9A9']; // 银牌
      case 3:
        return ['#CD7F32', '#8B4513']; // 铜牌
      default:
        return ['#f6f7f8', '#ffffff']; // 默认
    }
  };

  return (
    <View style={styles.rankItem}>
      <LinearGradient
        colors={getMedalColor(rank)}
        style={styles.rankContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={rank <= 3 ? 'white' : '#333'}>
          {rank}
        </Text>
      </LinearGradient>
      <Avatar
        size="sm"
        bg="white"
        source={require('../../images/student.png')}></Avatar>
      <View style={styles.userInfo}>
        <Text fontSize="md" fontWeight="semibold">
          {item.user.username}
        </Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text fontSize="lg" fontWeight="bold" color="#FF6B6B">
          {item.totalScore}分
        </Text>
      </View>
    </View>
  );
};

export default function ExamRank() {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<Record<string, ExamRankParams>, string>>();
  const { subjectId } = route.params;
  const { data: examScoreRank } = useExamScoreRank(
    ['examScoreRank', subjectId],
    { examProjectId: +subjectId },
  );

  const { data: examPre100Score } = useExamPre100Score(
    ['examPre100Score', subjectId],
    { examProjectId: +subjectId },
  );

  console.log('examScoreRank', examScoreRank);
  const examInfo = {
    subject: '2024年真题一次模拟试卷',
    highestScore: 95,
    totalStudents: 1000,
    currentRank: 56,
    nextScore: 96,
    topScore: 100,
    percentage: 94.4, // 超越的百分比
  };

  useEffect(() => {
    navigation.setOptions({
      title: '数学排行榜',
    });
  }, [navigation]);

  return (
    <ScrollView bg="white">
      {/* 顶部渐变背景 */}
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.headerGradient}>
        <VStack space={2} alignItems="center" pt={6} pb={8}>
          <Text color="white" fontSize="lg">
            📚 {examInfo.subject}
          </Text>
          <Text color="white" fontSize="4xl" fontWeight="bold">
            {examScoreRank?.bestScore}
          </Text>
          <Text color="white">历史最高分</Text>
        </VStack>
      </LinearGradient>

      {/* 统计信息卡片 */}
      <Box style={styles.statsCard}>
        <VStack space={4}>
          {/* 超越人数百分比 */}
          <Box bg="rgba(255,255,255,0.9)" p={4} rounded="lg" shadow={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md">超越用户</Text>
              <HStack alignItems="center" space={2}>
                <Text fontSize="2xl" color="#4c669f" fontWeight="bold">
                  {examScoreRank?.beatPercentage}%
                </Text>
                <Text fontSize="lg">🏃</Text>
              </HStack>
            </HStack>
          </Box>

          {/* 与上名差距 */}
          <Box bg="rgba(255,255,255,0.9)" p={4} rounded="lg" shadow={2}>
            <VStack space={2}>
              <HStack justifyContent="space-between">
                <Text fontSize="md">与上名差距</Text>
                <HStack alignItems="center" space={2}>
                  <Text fontSize="xl" color="#4c669f" fontWeight="bold">
                    {examScoreRank?.gapToPrev}
                  </Text>
                  <Text fontSize="lg">⬆️</Text>
                </HStack>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                上名成绩：{examScoreRank?.prevRankScore}分
              </Text>
            </VStack>
          </Box>

          {/* 与第一名差距 */}
          <Box bg="rgba(255,255,255,0.9)" p={4} rounded="lg" shadow={2}>
            <VStack space={2}>
              <HStack justifyContent="space-between">
                <Text fontSize="md">距离第一名</Text>
                <HStack alignItems="center" space={2}>
                  <Text fontSize="xl" color="#4c669f" fontWeight="bold">
                    {examScoreRank?.gapToFirst}
                  </Text>
                  <Text fontSize="lg">👑</Text>
                </HStack>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                第一名成绩：{examScoreRank?.firstScore}分
              </Text>
            </VStack>
          </Box>

          {/* 当前排名 */}
          <Box bg="rgba(255,255,255,0.9)" p={4} rounded="lg" shadow={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md">当前排名</Text>
              <HStack alignItems="center" space={2}>
                <Text fontSize="2xl" color="#4c669f" fontWeight="bold">
                  {examScoreRank?.rank}
                </Text>
                <Text fontSize="lg">🏆</Text>
              </HStack>
            </HStack>
          </Box>
        </VStack>
      </Box>

      {/* 新增展示前100名学生成绩数据，学生信息有 头像 昵称 分数 */}
      <View style={styles.rankList}>
        {examPre100Score?.map((item, index) => (
          <RankItem key={item.id} rank={index + 1} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    minHeight: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  statsCard: {
    marginTop: -30,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(246,246,246,0.9)',
  },
  rankList: {
    padding: 16,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rankContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  scoreContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
  },
});
