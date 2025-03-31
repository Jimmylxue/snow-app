import React, { memo, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, Toast, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { TExamItem, useDelExamQuestion, useTypeExam } from '../../service/exam';
import { ExamQuestionItem } from './components/ExamQuestionItem';
import { ExamQuestionModal } from './components/ExamQuestionModal';
import { ExamItem } from './Exam';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType } from '../../service';

type RouterParams = RouteProp<RootStackParamList, 'CourseTypeDetail'>;

/**
 * 某个类型下的考题页面
 */
export default memo(() => {
  const { state } = useAppState();
  const isManager = state.userInfo?.role === ERoleType.管理员;
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  console.log('params', params);
  const { data, refetch } = useTypeExam(
    ['examList'],
    {
      typeId: params.id,
    },
    {
      enabled: !!params.id,
    },
  );
  const [visible, setVisible] = useState<boolean>(false);
  const chooseQuestion = useRef<TExamItem>();

  const { mutateAsync } = useDelExamQuestion({
    onSuccess() {
      Toast.show({ title: '删除成功' });
      refetch();
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: params.typeName,
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" h="full">
        <ScrollView px={2} pt={2}>
          {data?.length ? (
            data?.map(question => (
              <ExamQuestionItem
                question={question as ExamItem}
                key={question.id}
                showAnswer
                onDelete={async () => {
                  await mutateAsync({ id: question.id });
                }}
                onEdit={() => {
                  chooseQuestion.current = question;
                  setVisible(true);
                }}
                showMenu={!!isManager}
              />
            ))
          ) : (
            <View flex={1} h="16" justifyContent="center" alignItems="center">
              <Text>暂无数据</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <ExamQuestionModal
        type="edit"
        examQuestion={chooseQuestion.current!}
        showModal={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </SafeAreaView>
  );
});
