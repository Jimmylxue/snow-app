import { Button, ScrollView, Text, Toast, View } from 'native-base';
import React, { SafeAreaView, TouchableOpacity } from 'react-native';
import { TExamItem, useRandomQuestion } from '../../service/exam';
import { ExamQuestionItem } from './components/ExamQuestionItem';
import { adaptive } from '../../utils';
import { useEffect, useState } from 'react';
import { OtherExamMap } from './map';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';

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
  }, [navigation, params]);

  return (
    <SafeAreaView>
      <View h="full" mt={2} px={2} pb="12">
        <ScrollView>
          {questionList?.map((question, index) => (
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
          ))}
        </ScrollView>
        <View position="absolute" left={2} w="full" bottom="0" h="12">
          {!isOver ? (
            <Button
              onPress={() => {
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
                setIsOver(true);
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
    </SafeAreaView>
  );
}
