import { ScrollView, TouchableOpacity } from 'react-native';

import { useEffect, useRef, useState } from 'react';
import { AddIcon, Divider, Text, Toast, View } from 'native-base';
import { TExamType, useDelExamType, useExamType } from '../../service/exam';
import ExamTypeCard from './components/ExamTypeCard';
import { adaptive } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { ExamTypeModal } from './components/ExamTypeModal';

export function ExamTypeList() {
  const navigation = useNavigation();
  const { data, refetch } = useExamType(['examType'], {}, {});
  const [visible, setVisible] = useState<boolean>(false);
  const chooseCourseType = useRef<TExamType>();
  const type = useRef<'add' | 'edit'>('add');

  const { mutateAsync } = useDelExamType({
    onSuccess() {
      Toast.show({ title: '删除成功' });
      refetch();
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            type.current = 'add';
            setVisible(true);
          }}>
          <View pr={2}>
            <AddIcon size="md" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <ScrollView>
        <View
          style={{
            paddingTop: adaptive(450),
          }}>
          {data?.map(examType => (
            <ExamTypeCard
              key={examType.id}
              name={examType.name}
              desc={examType.desc}
              clubId={examType.id}
              onEdit={() => {
                type.current = 'edit';
                chooseCourseType.current = examType;
                setVisible(true);
              }}
              onDelete={async () => {
                await mutateAsync({
                  id: examType.id,
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
      <ExamTypeModal
        type={type.current}
        examType={chooseCourseType.current!}
        showModal={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
