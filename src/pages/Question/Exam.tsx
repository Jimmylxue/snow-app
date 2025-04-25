import {
  AlertDialog,
  Box,
  Button,
  ScrollView,
  Text,
  Toast,
  View,
} from 'native-base';
import React, { SafeAreaView, TouchableOpacity } from 'react-native';
import { TExamItem, useRandomQuestion } from '../../service/exam';
import { ExamQuestionItem } from './components/ExamQuestionItem';
import { useEffect, useRef, useState } from 'react';
import { OtherExamMap } from './map';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useAddComplete, useCompleteRank } from '../../service/study';
import { baseFormatTime } from '../../utils';

export type ExamItem = TExamItem & { choose: string };
type RouterParams = RouteProp<RootStackParamList, 'ExamPage'>;

/**
/**
 * 考试页面
 */
export function ExamPage() {
  const navigation = useNavigation();
  const { params } = useRoute<RouterParams>();
  const [questionList, setQuestionList] = useState<ExamItem[]>([]);
  const visibleTime = useRef(Date.now());
  const { refetch } = useRandomQuestion(
    ['exam'],
    { typeId: params.typeId },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data?.length) {
          setQuestionList(data.map(item => ({ ...item, choose: '' })));
        } else {
          setQuestionList([]);
        }
      },
    },
  );

  const { data: completeRank, refetch: refetchCompleteRank } = useCompleteRank(
    ['completeRank'],
    { questionTypeId: params.typeId },
    {
      refetchOnWindowFocus: false,
      enabled: true,
    },
  );

  const [showRank, setShowRank] = useState<boolean>(false);

  const { mutate: addComplete } = useAddComplete();

  const [isOver, setIsOver] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      title: params.title,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            refetch();
          }}>
          <View pr={2}>
            <Text>刷新</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, params, refetch]);

  return (
    <SafeAreaView>
      <View h="full" mt={2} px={2} pb="12">
        <ScrollView>
          {questionList?.length ? (
            questionList?.map((question, index) => (
              <ExamQuestionItem
                question={question}
                key={index}
                showAnswer={isOver}
                onChoose={choose => {
                  setQuestionList(pre => {
                    const newList = [...pre];
                    newList[index].choose = choose;
                    return [...newList];
                  });
                }}
                showMenu={false}
              />
            ))
          ) : (
            <View w="full" h="full" justifyContent="center" alignItems="center">
              <Text mt={12}>暂无题库</Text>
            </View>
          )}
        </ScrollView>
        <View position="absolute" left={2} w="full" bottom="0" h="12">
          {!isOver ? (
            <Button
              disabled={!questionList.length}
              onPress={async () => {
                if (questionList.find(item => item.choose === '')) {
                  Toast.show({ title: '请写完试卷再提交' });
                  return;
                }
                let trueCount = 0,
                  falseCount = 0;

                questionList.forEach(question => {
                  // @ts-ignore
                  const choose = OtherExamMap[question.choose];
                  if (choose === question.answer) {
                    trueCount++;
                  } else {
                    falseCount++;
                  }
                });

                Toast.show({
                  title: `交卷成功，${trueCount}正确，${falseCount}错误`,
                });
                await addComplete({
                  questionTypeId: params.typeId,
                  useTime: (Date.now() - visibleTime.current) / 1000,
                });
                refetchCompleteRank();
                setIsOver(true);
                setShowRank(true);
              }}>
              提交试卷
            </Button>
          ) : (
            <Button
              onPress={() => {
                setIsOver(false);
                refetch();
              }}>
              重新刷题
            </Button>
          )}
        </View>
      </View>
      <AlertDialog
        // @ts-ignore
        leastDestructiveRef={null}
        isOpen={showRank}
        onClose={() => {
          setShowRank(false);
        }}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>打卡成功</AlertDialog.Header>
          <AlertDialog.Body>
            <Box>恭喜您完成这个阶段的学习打卡，相关数据如下：</Box>
            <Box>
              <Box>
                <Text>超过用户数：</Text>
                <Text>{completeRank?.percentage}</Text>
              </Box>
              <Box>
                <Text>
                  第一个完成的考试的用时：{completeRank?.firstComplete.useTime}
                  分钟
                </Text>
                <Text>
                  完成时间：
                  {baseFormatTime(completeRank?.firstComplete?.createdTime!)}
                </Text>
              </Box>
            </Box>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  setShowRank(false);
                }}>
                继续努力
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </SafeAreaView>
  );
}
