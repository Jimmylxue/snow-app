import { Button, ScrollView, Toast, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { TExamItem, useRandomQuestion } from '../../service/exam';
import { ExamQuestionItem } from './components/ExamQuestionItem';
import { adaptive } from '../../utils';
import { useState } from 'react';
import { OtherExamMap } from './map';

export type ExamItem = TExamItem & { choose: string };

/**
 * 考试页面
 */
export function ExamPage() {
  const [questionList, setQuestionList] = useState<ExamItem[]>([]);
  const { refetch } = useRandomQuestion(
    ['exam'],
    {},
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

  return (
    <SafeAreaView>
      <View
        h="full"
        style={{
          paddingTop: adaptive(250),
        }}
        px={2}
        pb="12">
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
