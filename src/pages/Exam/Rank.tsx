import React, { useEffect } from 'react';
import { Box, Text, VStack, HStack, ScrollView } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useExamScoreRank } from '../../service/study';

type ExamRankParams = {
  subjectId: number;
};

export default function ExamRank() {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<Record<string, ExamRankParams>, string>>();
  const { subjectId } = route.params;
  const { data: examScoreRank } = useExamScoreRank(
    ['examScoreRank', subjectId],
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
});
